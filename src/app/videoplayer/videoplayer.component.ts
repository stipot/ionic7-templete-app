import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Интерфейс для описания видео
interface Video {
  src: string; // Ссылка на видео
  thumbnail: string; // Миниатюра (превью) видео
  title: string; // Название видео
}

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  // Привязки к элементам в шаблоне
  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef; // Сам плеер
  @ViewChild('playPauseBtn', { static: true }) playPauseBtn!: ElementRef; // Кнопка воспроизведения/паузы
  @ViewChild('muteBtn', { static: true }) muteBtn!: ElementRef; // Кнопка включения/выключения звука
  @ViewChild('fullScreenBtn', { static: true }) fullScreenBtn!: ElementRef; // Кнопка полноэкранного режима
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef; // Ползунок прогресса
  @ViewChild('speedBtn', { static: true }) speedBtn!: ElementRef; // Кнопка изменения скорости

  videos: Video[] = []; // Список видео
  controlsVisible: boolean = false; // Переменная для отображения/скрытия панели управления

  constructor() {}

  ngOnInit(): void {
    // Ссылки на элементы DOM
    const video = this.videoPlayer.nativeElement;
    const playPauseBtn = this.playPauseBtn.nativeElement;
    const muteBtn = this.muteBtn.nativeElement;
    const fullScreenBtn = this.fullScreenBtn.nativeElement;
    const progressBar = this.progressBar.nativeElement;
    const speedBtn = this.speedBtn.nativeElement;
    const volumeSlider = document.querySelector('.volume-slider') as HTMLInputElement;

    // Функция воспроизведения/паузы видео
    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = 'Pause'; // Меняем текст кнопки
      } else {
        video.pause();
        playPauseBtn.textContent = 'Play'; // Меняем текст кнопки
      }
    });

    // Функция изменения громкости с помощью ползунка
    video.volume = 0.25; // Устанавливаем начальную громкость
    volumeSlider.addEventListener('input', () => {
      video.volume = +volumeSlider.value / 100; // Преобразуем значение ползунка в громкость
    });

    // Функция выключения/включения звука
    muteBtn.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        muteBtn.textContent = 'Mute'; // Меняем текст кнопки
      } else {
        video.muted = true;
        muteBtn.textContent = 'Unmute'; // Меняем текст кнопки
      }
    });

    // Функция перехода в полноэкранный режим
    fullScreenBtn.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen(); // Полноэкранный режим для большинства браузеров
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // Для Firefox
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen(); // Для Chrome, Safari, Opera
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen(); // Для IE/Edge
      }
    });

    // Обновление ползунка прогресса при воспроизведении видео
    video.addEventListener('timeupdate', () => {
      progressBar.value = (video.currentTime / video.duration) * 100; // Рассчитываем прогресс в процентах
    });

    // Перемотка видео при перемещении ползунка
    progressBar.addEventListener('input', () => {
      video.currentTime = (progressBar.value / 100) * video.duration; // Перемещаем время воспроизведения
    });

    // Функция для отображения/скрытия настроек скорости
    speedBtn.addEventListener('click', () => {
      const speedOptions = speedBtn.nextElementSibling; // Находим меню скоростей
      speedOptions.style.display = speedOptions.style.display === 'block' ? 'none' : 'block'; // Переключаем видимость
    });
  }

  // Устанавливаем скорость воспроизведения
  setSpeed(speed: number): void {
    const video = this.videoPlayer.nativeElement;
    video.playbackRate = speed; // Устанавливаем скорость
    this.speedBtn.nativeElement.textContent = `x${speed}`; // Меняем текст кнопки
  }

  // Меняем видео на новое
  changeVideo(video: Video): void {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.src = video.src; // Устанавливаем источник видео
    videoElement.load(); // Перезагружаем видео
    videoElement.play(); // Начинаем воспроизведение
  }

  // Показываем панель управления
  showControls(): void {
    this.controlsVisible = true; // Устанавливаем видимость панели управления
  }

  // Скрываем панель управления
  hideControls(): void {
    this.controlsVisible = false; // Скрываем панель управления
  }
  
  generateThumbnail(videoUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const videoElement = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      videoElement.src = videoUrl;
      videoElement.muted = true; // Mute the video to comply with autoplay policies
      videoElement.autoplay = true; // Start playback automatically
  
      // Wait for the video metadata to load
      videoElement.addEventListener('loadedmetadata', () => {
        // Ensure the video duration is sufficient
        if (videoElement.duration >= 5) {
          videoElement.currentTime = 5; // Seek to the 5th second
        } else {
          videoElement.currentTime = videoElement.duration / 2; // Seek to the middle if shorter than 5 seconds
        }
  
        // Use 'seeked' event to ensure the browser has completed seeking
        videoElement.addEventListener('seeked', () => {
          // Draw the video frame to the canvas
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
          // Generate the data URL of the thumbnail
          const thumbnailUrl = canvas.toDataURL('image/jpeg');
          resolve(thumbnailUrl);
        });
  
        // Handle seek errors
        videoElement.addEventListener('seekerror', () => {
          resolve('path/to/default-thumbnail.jpg');
        });
      });
  
      // Handle video load errors
      videoElement.addEventListener('error', (event) => {
        console.error('Video load error:', event);
        resolve('path/to/default-thumbnail.jpg');
      });
    });
  }

  // Обработка выбора папки с видео
  handleFolderSelection(event: any): void {
    const files: FileList = event.target.files; // Список файлов из выбора
    const videoPromises: Promise<Video>[] = []; // Массив обещаний для обработки видео

    for (const file of Array.from(files)) {
      if (file.type.startsWith('video/')) { // Проверяем, что файл — видео
        const videoUrl = URL.createObjectURL(file); // Создаем ссылку на видео

        const videoPromise = this.generateThumbnail(videoUrl).then((thumbnail) => {
          return {
            src: videoUrl, // Ссылка на видео
            thumbnail: thumbnail, // Миниатюра
            title: file.name, // Имя файла
          } as Video;
        });

        videoPromises.push(videoPromise); // Добавляем обещание в массив
      }
    }

    // Обновляем список видео, когда все миниатюры готовы
    Promise.all(videoPromises).then((videos) => {
      this.videos = videos;
    });
  }
}
