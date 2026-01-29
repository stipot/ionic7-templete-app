import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { 
  FaceDetector, 
  GestureRecognizer,
  FilesetResolver, 
  Detection,
  GestureRecognizerResult 
} from '@mediapipe/tasks-vision';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface DetectionStats {
  faces: number;
  gestures: string[];
  confidence: number;
  fps: number;
}

@Component({
  selector: 'app-face-detector',
  templateUrl: './face-detector.component.html',
  styleUrls: ['./face-detector.component.scss']
})
export class FaceDetectorComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('particleCanvas', { static: false }) particleCanvasElement!: ElementRef<HTMLCanvasElement>;

  faceDetector: FaceDetector | null = null;
  gestureRecognizer: GestureRecognizer | null = null;
  
  loading = true;
  error: string | null = null;
  stream: MediaStream | null = null;
  animationId: any = null;
  lastVideoTime = -1;
  
  // Статистика
  stats: DetectionStats = {
    faces: 0,
    gestures: [],
    confidence: 0,
    fps: 0
  };
  
  // Для подсчета FPS
  private frameCount = 0;
  private lastFpsUpdate = Date.now();
  
  // Частицы для эффектов
  private particles: Particle[] = [];
  
  // Обнаруженные жесты
  detectedGestures: Map<string, number> = new Map();
  
  // Эмодзи для жестов
  gestureEmojis: { [key: string]: string } = {
    'Thumb_Up': '👍',
    'Victory': '✌️',
    'Closed_Fist': '✊',
    'Open_Palm': '🖐️',
    'Pointing_Up': '☝️',
    'ILoveYou': '🤟',
    'None': ''
  };

  // Управление сворачиванием панелей
  statsCollapsed = false;
  gesturesCollapsed = true;
  detectionsCollapsed = true;
  recognitionInfoCollapsed = false;

  // Управление функциями детекции
  faceDetectionEnabled = true;
  gestureDetectionEnabled = true;
  cameraEnabled = true;

  // Информация о распознанных объектах
  recognitionInfo: string[] = [];

  ngOnInit() {
    console.log('🚀 Инициализация AI детектора лиц и жестов');
    setTimeout(() => {
      this.initDetectors();
    }, 300);
  }

  ngOnDestroy() {
    this.cleanup();
  }

  async initDetectors() {
    try {
      console.log('📦 Загрузка AI моделей MediaPipe...');
      
      // Инициализация Vision tasks
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );
      
      console.log('✅ FilesetResolver загружен');
      
      // Создание Face Detector
      this.faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        minDetectionConfidence: 0.5
      });
      
      console.log('✅ Face Detector загружен');

      // Создание Gesture Recognizer
      this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numHands: 2,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
      
      console.log('✅ Gesture Recognizer загружен');

      // Запуск камеры
      await this.startCamera();
      
    } catch (err: any) {
      console.error('❌ Ошибка инициализации:', err);
      this.error = 'Не удалось загрузить AI модели: ' + err.message;
      this.loading = false;
    }
  }

  async startCamera() {
    try {
      console.log('📹 Запуск камеры...');
      
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      console.log('✅ Поток камеры получен');

      if (this.videoElement) {
        const video = this.videoElement.nativeElement;
        video.srcObject = this.stream;
        
        video.onloadedmetadata = () => {
          console.log('📐 Видео размер:', video.videoWidth, 'x', video.videoHeight);
          video.play().then(() => {
            console.log('▶️ Видео запущено');
            this.loading = false;
            this.detectAll();
          }).catch(err => {
            console.error('❌ Ошибка воспроизведения:', err);
            this.error = 'Ошибка воспроизведения: ' + err.message;
            this.loading = false;
          });
        };
        
        video.onerror = (err) => {
          console.error('❌ Ошибка видео элемента:', err);
          this.error = 'Ошибка видео элемента';
          this.loading = false;
        };
      }
    } catch (err: any) {
      console.error('❌ Ошибка доступа к камере:', err);
      this.error = 'Не удалось получить доступ к камере: ' + err.message;
      this.loading = false;
    }
  }

  async detectAll() {
    if (!this.videoElement || !this.canvasElement || !this.cameraEnabled) {
      this.animationId = requestAnimationFrame(() => this.detectAll());
      return;
    }

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx || video.readyState !== 4) {
      this.animationId = requestAnimationFrame(() => this.detectAll());
      return;
    }

    // Установка размеров canvas
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Также обновляем размер canvas для частиц
      if (this.particleCanvasElement) {
        const particleCanvas = this.particleCanvasElement.nativeElement;
        particleCanvas.width = video.videoWidth;
        particleCanvas.height = video.videoHeight;
      }
    }

    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentTime = video.currentTime;
    
    if (currentTime !== this.lastVideoTime) {
      this.lastVideoTime = currentTime;
      
      try {
        const timestamp = performance.now();
        
        let faceDetections = null;
        let gestureResults = null;

        // Детекция лиц (только если включено)
        if (this.faceDetectionEnabled && this.faceDetector) {
          faceDetections = this.faceDetector.detectForVideo(video, timestamp);
        }
        
        // Детекция жестов (только если включено)
        if (this.gestureDetectionEnabled && this.gestureRecognizer) {
          gestureResults = this.gestureRecognizer.recognizeForVideo(video, timestamp);
        }
        
        // Обновление статистики
        this.updateStats(faceDetections, gestureResults);
        
        // Обновление информации о распознавании
        this.updateRecognitionInfo(faceDetections, gestureResults);
        
        // Отрисовка результатов
        if (this.faceDetectionEnabled && faceDetections) {
          this.drawFaces(ctx, faceDetections, canvas);
        }
        
        if (this.gestureDetectionEnabled && gestureResults) {
          this.drawGestures(ctx, gestureResults, canvas);
        }
        
        // Обновление частиц
        this.updateParticles();
        
      } catch (err) {
        console.error('❌ Ошибка детекции:', err);
      }
    }

    this.animationId = requestAnimationFrame(() => this.detectAll());
  }

  drawFaces(ctx: CanvasRenderingContext2D, detections: any, canvas: HTMLCanvasElement) {
    if (detections && detections.detections && detections.detections.length > 0) {
      detections.detections.forEach((detection: Detection, index: number) => {
        const bbox = detection.boundingBox;
        
        if (bbox) {
          // Градиентная обводка
          const gradient = ctx.createLinearGradient(
            bbox.originX, 
            bbox.originY, 
            bbox.originX + bbox.width, 
            bbox.originY + bbox.height
          );
          gradient.addColorStop(0, '#00f5ff');
          gradient.addColorStop(0.5, '#7b2ff7');
          gradient.addColorStop(1, '#f107a3');
          
          // Внешнее свечение
          ctx.shadowColor = '#00f5ff';
          ctx.shadowBlur = 15;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.strokeRect(bbox.originX, bbox.originY, bbox.width, bbox.height);
          
          // Убираем тень для текста
          ctx.shadowBlur = 0;
          
          // Уровень уверенности с фоном
          if (detection.categories && detection.categories.length > 0) {
            const score = (detection.categories[0].score * 100).toFixed(0);
            const text = `Face ${index + 1}: ${score}%`;
            
            ctx.font = 'bold 16px "Poppins", sans-serif';
            const textWidth = ctx.measureText(text).width;
            
            // Фон для текста
            ctx.fillStyle = 'rgba(0, 245, 255, 0.2)';
            ctx.fillRect(bbox.originX, bbox.originY - 30, textWidth + 16, 26);
            
            // Текст
            ctx.fillStyle = '#00f5ff';
            ctx.fillText(text, bbox.originX + 8, bbox.originY - 10);
          }

          // Ключевые точки лица с анимацией
          if (detection.keypoints) {
            detection.keypoints.forEach((keypoint: any) => {
              const x = keypoint.x * canvas.width;
              const y = keypoint.y * canvas.height;
              
              const gradient = ctx.createRadialGradient(x, y, 0, x, y, 5);
              gradient.addColorStop(0, '#ff006e');
              gradient.addColorStop(1, 'rgba(255, 0, 110, 0)');
              
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(x, y, 5, 0, 2 * Math.PI);
              ctx.fill();
            });
          }
        }
      });
    }
  }

  drawGestures(ctx: CanvasRenderingContext2D, results: GestureRecognizerResult, canvas: HTMLCanvasElement) {
    if (!results || !results.landmarks) return;

    // Рисуем руки
    results.landmarks.forEach((handLandmarks, handIndex) => {
      // Соединения между точками руки
      const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4], // Большой палец
        [0, 5], [5, 6], [6, 7], [7, 8], // Указательный
        [0, 9], [9, 10], [10, 11], [11, 12], // Средний
        [0, 13], [13, 14], [14, 15], [15, 16], // Безымянный
        [0, 17], [17, 18], [18, 19], [19, 20], // Мизинец
        [5, 9], [9, 13], [13, 17] // Ладонь
      ];

      // Рисуем соединения
      ctx.strokeStyle = 'rgba(123, 47, 247, 0.6)';
      ctx.lineWidth = 3;
      
      connections.forEach(([start, end]) => {
        const startPoint = handLandmarks[start];
        const endPoint = handLandmarks[end];
        
        ctx.beginPath();
        ctx.moveTo(startPoint.x * canvas.width, startPoint.y * canvas.height);
        ctx.lineTo(endPoint.x * canvas.width, endPoint.y * canvas.height);
        ctx.stroke();
      });

      // Рисуем точки
      handLandmarks.forEach((landmark: any, index: number) => {
        const x = landmark.x * canvas.width;
        const y = landmark.y * canvas.height;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
        gradient.addColorStop(0, '#7b2ff7');
        gradient.addColorStop(1, 'rgba(123, 47, 247, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Особая отметка для кончиков пальцев
        if ([4, 8, 12, 16, 20].includes(index)) {
          ctx.fillStyle = '#f107a3';
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fill();
        }
      });
    });

    // Показываем распознанные жесты
    if (results.gestures && results.gestures.length > 0) {
      results.gestures.forEach((gestureList, handIndex) => {
        if (gestureList.length > 0) {
          const gesture = gestureList[0];
          const emoji = this.gestureEmojis[gesture.categoryName] || '👋';
          
          // Получаем позицию запястья для отображения эмодзи
          const wrist = results.landmarks[handIndex][0];
          const x = wrist.x * canvas.width;
          const y = wrist.y * canvas.height;
          
          // Эмодзи с анимацией
          ctx.font = '48px Arial';
          ctx.textAlign = 'center';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 10;
          ctx.fillText(emoji, x, y - 50);
          ctx.shadowBlur = 0;
          
          // Создаем частицы при обнаружении нового жеста
          if (!this.detectedGestures.has(gesture.categoryName)) {
            this.createParticles(x, y, emoji);
          }
          this.detectedGestures.set(gesture.categoryName, Date.now());
        }
      });
    }

    // Удаляем старые жесты
    const now = Date.now();
    for (const [gesture, timestamp] of this.detectedGestures.entries()) {
      if (now - timestamp > 1000) {
        this.detectedGestures.delete(gesture);
      }
    }
  }

  createParticles(x: number, y: number, emoji: string) {
    const colors = ['#00f5ff', '#7b2ff7', '#f107a3', '#ffd000'];
    
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const velocity = 2 + Math.random() * 3;
      
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 60,
        maxLife: 60,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 3
      });
    }
  }

  updateParticles() {
    if (!this.particleCanvasElement) return;
    
    const canvas = this.particleCanvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.2; // гравитация
      particle.life--;
      
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = alpha;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.globalAlpha = 1;
      
      return particle.life > 0;
    });
  }

  updateStats(faceDetections: any, gestureResults: GestureRecognizerResult | null) {
    // Обновление FPS
    this.frameCount++;
    const now = Date.now();
    if (now - this.lastFpsUpdate >= 1000) {
      this.stats.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }

    // Количество лиц
    this.stats.faces = faceDetections?.detections?.length || 0;

    // Средняя уверенность
    if (faceDetections?.detections?.length > 0) {
      const totalConfidence = faceDetections.detections.reduce(
        (sum: number, det: Detection) => sum + (det.categories?.[0]?.score || 0),
        0
      );
      this.stats.confidence = (totalConfidence / faceDetections.detections.length) * 100;
    } else {
      this.stats.confidence = 0;
    }

    // Жесты
    this.stats.gestures = [];
    if (gestureResults?.gestures && gestureResults.gestures.length > 0) {
      gestureResults.gestures.forEach(gestureList => {
        if (gestureList.length > 0) {
          const gesture = gestureList[0];
          if (gesture.categoryName !== 'None') {
            this.stats.gestures.push(gesture.categoryName);
          }
        }
      });
    }
  }

  updateRecognitionInfo(faceDetections: any, gestureResults: GestureRecognizerResult | null) {
    this.recognitionInfo = [];

    // Информация о лицах
    if (faceDetections?.detections && faceDetections.detections.length > 0) {
      const faceCount = faceDetections.detections.length;
      const faceWord = faceCount === 1 ? 'человек' : 'людей';
      this.recognitionInfo.push(`👤 Обнаружено ${faceCount} ${faceWord}`);
      
      // Детальная информация по каждому лицу
      faceDetections.detections.forEach((detection: Detection, index: number) => {
        const confidence = detection.categories?.[0]?.score || 0;
        const confidencePercent = (confidence * 100).toFixed(1);
        this.recognitionInfo.push(`   Лицо ${index + 1}: уверенность ${confidencePercent}%`);
      });
    } else if (this.faceDetectionEnabled) {
      this.recognitionInfo.push('👤 Лица не обнаружены');
    }

    // Информация о жестах
    if (gestureResults?.gestures && gestureResults.gestures.length > 0) {
      const gesturesFound: string[] = [];
      
      gestureResults.gestures.forEach((gestureList, handIndex) => {
        if (gestureList.length > 0) {
          const gesture = gestureList[0];
          if (gesture.categoryName !== 'None') {
            const gestureName = this.getGestureRussianName(gesture.categoryName);
            const confidence = (gesture.score * 100).toFixed(1);
            gesturesFound.push(`✋ Жест "${gestureName}" (${confidence}%)`);
          }
        }
      });

      if (gesturesFound.length > 0) {
        this.recognitionInfo.push(...gesturesFound);
      } else if (this.gestureDetectionEnabled) {
        this.recognitionInfo.push('✋ Жесты не обнаружены');
      }
    } else if (this.gestureDetectionEnabled) {
      this.recognitionInfo.push('✋ Руки не обнаружены');
    }

    // Если ничего не обнаружено
    if (this.recognitionInfo.length === 0) {
      this.recognitionInfo.push('🔍 Ожидание объектов...');
    }
  }

  getGestureRussianName(gestureName: string): string {
    const names: { [key: string]: string } = {
      'Thumb_Up': 'Лайк',
      'Victory': 'Победа',
      'Closed_Fist': 'Кулак',
      'Open_Palm': 'Открытая ладонь',
      'Pointing_Up': 'Палец вверх',
      'ILoveYou': 'Я люблю тебя',
      'None': 'Неопределенный'
    };
    return names[gestureName] || gestureName;
  }

  toggleFaceDetection() {
    this.faceDetectionEnabled = !this.faceDetectionEnabled;
    console.log('🎭 Детекция лиц:', this.faceDetectionEnabled ? 'включена' : 'выключена');
  }

  toggleGestureDetection() {
    this.gestureDetectionEnabled = !this.gestureDetectionEnabled;
    console.log('✋ Распознавание жестов:', this.gestureDetectionEnabled ? 'включено' : 'выключено');
  }

  async toggleCamera() {
    this.cameraEnabled = !this.cameraEnabled;
    console.log('📹 Камера:', this.cameraEnabled ? 'включена' : 'выключена');
    
    if (!this.cameraEnabled) {
      // Останавливаем поток камеры
      if (this.stream) {
        this.stream.getTracks().forEach(track => {
          track.stop();
          console.log('⏹️ Трек камеры остановлен');
        });
        this.stream = null;
      }
      
      // Очищаем видео элемент
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = null;
      }
      
      // Очищаем canvas при выключении камеры
      if (this.canvasElement) {
        const canvas = this.canvasElement.nativeElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      if (this.particleCanvasElement) {
        const canvas = this.particleCanvasElement.nativeElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      
      // Очищаем информацию о распознавании
      this.recognitionInfo = ['📹 Камера выключена'];
      this.stats.faces = 0;
      this.stats.gestures = [];
      this.stats.confidence = 0;
      
    } else {
      // Включаем камеру заново
      await this.startCamera();
    }
  }

  cleanup() {
    console.log('🧹 Очистка ресурсов...');
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    
    if (this.faceDetector) {
      this.faceDetector.close();
    }
    
    if (this.gestureRecognizer) {
      this.gestureRecognizer.close();
    }
  }
}