import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-videoeditor',
  templateUrl: './videoeditor.component.html',
  styleUrls: ['./videoeditor.component.scss'],
})
export class VideoeditorComponent {
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
  activeMode: 'none' | 'filters' | 'trim' | 'quality' = 'none';
  setMode(mode: 'none' | 'filters' | 'trim' | 'quality') {
  this.activeMode = mode;
}
  videoSrc: string | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  selectedFilter: string = ''; // Текущий фильтр
  selectedRatio: string = 'original'; 
  trimStart: number = 0;
  trimEnd: number = 0;
  // То, что мы официально "применили"
  activeRange = { start: 0, end: 0 };
  isTrimmed = false; // Флаг, что мы работаем с обрезанным фрагментом
  isProcessing = false;
  recordingProgress: number = 0;

  filtersList = [
  { name: 'Оригинал', class: '' },
  { name: 'Ч/Б', class: 'grayscale' },
  { name: 'Сепия', class: 'sepia' },
  { name: 'Инверсия', class: 'invert' },
  { name: 'Яркий', class: 'saturate' },
  { name: 'Резкость', class: 'sharpen' }
  ];
  applyFilter(filterClass: string) {
  this.selectedFilter = filterClass;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoSrc = URL.createObjectURL(file);
      this.videoElement.nativeElement.src = this.videoSrc;
      this.isPlaying = false;
    }
  }
  setRatio(ratio: string) {
    this.selectedRatio = ratio;
  }
  onTrimChange(event: any) {
  this.trimStart = event.detail.value.lower;
  this.trimEnd = event.detail.value.upper;
  
  // Если пользователь двигает начало — перематываем видео на этот момент для предпросмотра
  this.videoElement.nativeElement.currentTime = this.trimStart;
  }
  onMetadataLoaded() {
    const video = this.videoElement.nativeElement;
    this.duration = video.duration;
    this.trimStart = 0;
    this.trimEnd = this.duration; // Изначально обрезка по всей длине
    this.activeRange = { start: 0, end: this.duration };
    this.isTrimmed = false;
    console.log('Данные видео загружены, обрезка сброшена');
  }

  onTimeUpdate() {
  const video = this.videoElement.nativeElement;
  this.currentTime = video.currentTime;

  // Если мы применили обрезку, не даем играть за ее пределы даже в режиме фильтров
  if (this.isTrimmed && this.currentTime >= this.activeRange.end) {
    video.pause();
    this.isPlaying = false;
    video.currentTime = this.activeRange.start;
  }
}

  togglePlay() {
  const video = this.videoElement.nativeElement;
    video.paused ? video.play() : video.pause();
  this.isPlaying = !video.paused;
}

  skip(seconds: number) {
    const video = this.videoElement.nativeElement;
    let newTime = video.currentTime + seconds;
    if (newTime < 0) newTime = 0;
    if (newTime > video.duration) newTime = video.duration;
    video.currentTime = newTime;
  }

  onSeek(event: any) {
  const video = this.videoElement.nativeElement;
  let targetTime = event.detail.value;

  // Если обрезка применена, ограничиваем ползунок перемотки (seekbar)
  if (this.isTrimmed) {
    if (targetTime < this.activeRange.start) targetTime = this.activeRange.start;
    if (targetTime > this.activeRange.end) targetTime = this.activeRange.end;
  }
  video.currentTime = targetTime;}

  formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds % 60) || 0;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

async saveTrimmedVideo() {
  const video = this.videoElement.nativeElement;
  this.isProcessing = true;

  // 1. Определяем размеры холста согласно выбранному Ratio
  let canvasWidth = video.videoWidth;
  let canvasHeight = video.videoHeight;

  if (this.selectedRatio === 'square') {
    canvasWidth = canvasHeight = Math.min(video.videoWidth, video.videoHeight);
  } else if (this.selectedRatio === 'portrait') {
    canvasWidth = video.videoHeight * (9 / 16);
    canvasHeight = video.videoHeight;
  }

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d')!;

  // 2. Настройка записи потока
  const stream = canvas.captureStream(30); // 30 кадров в секунду
  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = () => {
  const blob = new Blob(chunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `my_edited_video_${Date.now()}.webm`;
  a.click();

  // СБРОС СОСТОЯНИЯ
  this.isProcessing = false;          // Закрываем оверлей
  this.recordingProgress = 0;         // Обнуляем прогресс
  this.activeMode = 'none';           // Возвращаемся в главное меню инструментов
  
  video.pause();
  video.currentTime = 0;              // Возвращаем видео к началу
  this.currentTime = 0;               // Обновляем ползунок (seekbar)
};


  // 3. Подготовка видео к записи
  // Начинаем с того момента, который мы "Применили" через applyTrim()
  video.currentTime = this.activeRange.start;
  video.muted = true; // Без звука для стабильности записи через Canvas
  video.play();
  recorder.start();

  const drawFrame = () => {
  if (video.paused || video.ended || video.currentTime >= this.activeRange.end) {
    recorder.stop();
    this.recordingProgress = 100; // Финализируем прогресс
    return;
  }

  // РАСЧЕТ ПРОЦЕНТА
  const totalToRecord = this.activeRange.end - this.activeRange.start;
  const recordedSoFar = video.currentTime - this.activeRange.start;
  this.recordingProgress = Math.round((recordedSoFar / totalToRecord) * 100);
    // ПРИМЕНЯЕМ ФИЛЬТРЫ (берем текущий filter из CSS видео)
    ctx.filter = getComputedStyle(video).filter;
    
    // Расчет центрирования (аналог object-fit: cover)
    const scale = Math.max(canvasWidth / video.videoWidth, canvasHeight / video.videoHeight);
    const x = (canvasWidth - video.videoWidth * scale) / 2;
    const y = (canvasHeight - video.videoHeight * scale) / 2;
    
    ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);
    
    requestAnimationFrame(drawFrame);
  };

  drawFrame();
}

//метод применить обрезку
applyTrim() {
  this.activeRange.start = this.trimStart;
  this.activeRange.end = this.trimEnd;
  this.isTrimmed = true;
  
  // Возвращаем видео в начало нового фрагмента
  const video = this.videoElement.nativeElement;
  video.currentTime = this.activeRange.start;
  
  // Выходим в главное меню
  this.activeMode = 'none';
  
  console.log(`Фрагмент зафиксирован: ${this.activeRange.start} - ${this.activeRange.end}`);
}
}
