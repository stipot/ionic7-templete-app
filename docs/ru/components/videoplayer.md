# Video Player Component

## Описание

**Video Player Component** — это адаптивный видеоплеер, разработанный с использованием **Angular**, который предоставляет удобный интерфейс для просмотра видео. Компонент включает управление воспроизведением, громкостью, скоростью, полноэкранным режимом и прогрессом. Также поддерживает загрузку видео из папки и отображение миниатюр видеофайлов в виде слайдера.

---

## Функциональность

- **Управление воспроизведением:**
  - Воспроизведение/пауза видео.
  - Перемотка видео с использованием шкалы прогресса.

- **Управление звуком:**
  - Регулировка громкости с помощью ползунка.
  - Включение/выключение звука.

- **Настройка скорости:**
  - Выбор скорости воспроизведения (0.5x, 1x, 1.5x, 2x).

- **Полноэкранный режим:**
  - Возможность переключения видео в полноэкранный режим.

- **Слайдер с миниатюрами:**
  - Отображение списка видео с миниатюрами.
  - Возможность выбора видео из слайдера.
  - Автоматическое создание миниатюр для загруженных видео.

- **Загрузка видео:**
  - Поддержка загрузки видео из локальной папки.

---

## Структура HTML

### Основные элементы:
1. **Видеоэлемент**
   - `<video>` — основной элемент для воспроизведения видео.

2. **Кнопки управления воспроизведением**
   - Кнопка Play/Pause (`playPauseBtn`).
   - Ползунок прогресса (`progressBar`).
   - Отображение текущего времени и общей длительности.

3. **Управление звуком**
   - Кнопка включения/выключения звука (`muteBtn`).
   - Ползунок громкости.

4. **Настройка скорости**
   - Кнопка для выбора скорости воспроизведения (`speedBtn`).

5. **Полноэкранный режим**
   - Кнопка переключения в полноэкранный режим (`fullScreenBtn`).

6. **Слайдер с видео**
   - Список видео с миниатюрами (`video-list`).
   - Поддержка навигации (кнопки "вперед" и "назад").
   - Поле для загрузки видео из папки.

7. **Кнопка загрузки папки**
   - Поле для выбора папки с видеофайлами:
     ```html
     <input type="file" webkitdirectory (change)="handleFolderSelection($event)" />
     ```
   - Все загруженные видео автоматически добавляются в список и генерируют миниатюры.
---

## Основные методы компонента

### Управление видео
- **`playPauseBtn`**: включает или ставит видео на паузу.
- **`progressBar`**: управляет временем воспроизведения (перемотка).
- **`setSpeed(speed: number)`**: изменяет скорость воспроизведения видео.
- **`changeVideo(video: Video)`**: загружает и воспроизводит выбранное видео.

### Управление звуком
- **`volumeSlider`**: изменяет громкость.
- **`muteBtn`**: включает/выключает звук.

### Управление полноэкранным режимом
- **`fullScreenBtn`**: включает или выключает полноэкранный режим.

### Работа с миниатюрами и загрузкой
- **`generateThumbnail(videoUrl: string): Promise<string>`**: генерирует миниатюру для видео (первый кадр на 5-й секунде).
- **`handleFolderSelection(event: any)`**: обрабатывает выбор папки, создаёт список видео с миниатюрами.

### Отображение элементов управления
- **`showControls()`**: показывает элементы управления при наведении на видео.
- **`hideControls()`**: скрывает элементы управления при уходе курсора.


### TODO:
- **Исправить боковые кнопки перелистывания видео**
---