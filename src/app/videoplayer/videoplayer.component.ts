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

  // Генерация миниатюры для видео
  generateThumbnail(videoUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const videoElement = document.createElement('video'); // Создаем элемент видео
      const canvas = document.createElement('canvas'); // Создаем холст для рисования
      const context = canvas.getContext('2d'); // Получаем контекст для рисования

      videoElement.src = videoUrl; // Устанавливаем ссылку на видео
      videoElement.currentTime = 5; // Выбираем кадр на 5-й секунде

      videoElement.addEventListener('loadeddata', () => {
        canvas.width = videoElement.videoWidth; // Устанавливаем ширину холста
        canvas.height = videoElement.videoHeight; // Устанавливаем высоту холста
        context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height); // Рисуем кадр на холсте
        const thumbnailUrl = canvas.toDataURL('image/jpeg'); // Преобразуем холст в картинку
        resolve(thumbnailUrl); // Возвращаем ссылку на миниатюру
      });

      videoElement.addEventListener('error', () => {
        resolve('path/to/default-thumbnail.jpg'); // Если ошибка, возвращаем стандартную картинку
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
