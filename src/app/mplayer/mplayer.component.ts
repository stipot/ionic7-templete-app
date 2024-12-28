import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mplayer',
  templateUrl: './mplayer.component.html',
  styleUrls: ['./mplayer.component.scss'],
})
export class MplayerComponent implements OnInit {
  public progress = 0;
  public player_status = 'play';

  public track_pg = 0;
  public track_pg_step = 0.1;

  public track_title = 'Music Title';
  public track_author = 'Author Name';

  public track_list = [
    ['https://opengameart.org/sites/default/files/audio_preview/awesomeness.wav.ogg', 'Menu Music', 'Adventure', '0', 'selected', '48'],
    ['https://opengameart.org/sites/default/files/audio_preview/seashore.mp3.ogg', 'Fight Music', 'Adventure', '1', '', '173'],
    ['https://opengameart.org/sites/default/files/audio_preview/yesterbreeze.mp3.ogg', 'Strong Start', 'RPG Music', '2', '', '85'],
    ['https://opengameart.org/sites/default/files/audio_preview/game_2.mp3.ogg', 'Intro Music', 'Factory', '3', '', '82'],
    ['https://opengameart.org/sites/default/files/audio_preview/jkjkke%20-%20dream_0.mp3.ogg', 'Menu Music', 'Low Light', '4', '', '159']
  ];

  public track_count = 0;
  public track = new Audio(this.track_list[this.track_count][0]);
  public track_duration = 0;

  constructor(private translate: TranslateService) {
    this.track_title = this.track_list[this.track_count][1];
    this.track_author = this.track_list[this.track_count][2];

    // Ожидаем загрузки метаданных трека для получения длительности
    this.track.addEventListener('loadedmetadata', () => {
      this.track_duration = this.track.duration;
    });

    

    // Обновляем прогресс и текущее время каждую секунду
    setInterval(() => {
      if (this.player_status === 'pause') {
        this.track_pg = this.track.currentTime / this.track_duration;
        this.progress = this.track.currentTime / this.track_duration;
        if (this.progress >= 1) {
          this.set_zero_bar();
        }
      }
    }, 1000);
  }

  // Метод для форматирования времени в mm:ss
  formatTime(time: number): string {
    if (isNaN(time) || time === 0) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  set_track(title: string, author: string) {
    this.track_title = title;
    this.track_author = author;
  }

  set_zero_bar() {
    this.progress = 0;
    this.player_status = 'play';
    this.track.pause();
    this.track.currentTime = 0;
  }
public volume = 0.5; 

changeVolume(event: any) {
  this.volume = event.detail.value;
  this.track.volume = this.volume;
}

public filtered_track_list = this.track_list;

changeSeek(event: any) {
  this.track.currentTime = event.detail.value * this.track_duration;
}


change_status() {
    if (this.player_status === 'pause') {
      this.player_status = 'play';
      this.track.pause();
    } else {
      this.player_status = 'pause';
      this.track.play();
    }
  }

  next_track() {
    this.track.pause();

    this.track_list[this.track_count][4] = '';

    if (this.track_count < this.track_list.length - 1) {
      this.track_count += 1;
    } else {
      this.track_count = 0;
    }

    this.track = new Audio(this.track_list[this.track_count][0]);
    this.set_track(this.track_list[this.track_count][1], this.track_list[this.track_count][2]);
    this.track_list[this.track_count][4] = 'selected';

    this.track.addEventListener('loadedmetadata', () => {
      this.track_duration = this.track.duration;
    });

    this.track.volume = this.volume;

    this.progress = 0;
    if (this.player_status === 'pause') {
      this.track.play();
    }
  }

  prev_track() {
    this.track.pause();

    this.track_list[this.track_count][4] = '';

    if (this.track_count > 0) {
      this.track_count -= 1;
    } else {
      this.track_count = this.track_list.length - 1;
    }

    this.track = new Audio(this.track_list[this.track_count][0]);
    this.set_track(this.track_list[this.track_count][1], this.track_list[this.track_count][2]);
    this.track_list[this.track_count][4] = 'selected';

    this.track.addEventListener('loadedmetadata', () => {
      this.track_duration = this.track.duration;
    });

    this.track.volume = this.volume;

    this.progress = 0;
    if (this.player_status === 'pause') {
      this.track.play();
    }
  }

  searchTracks(event: any) {
    const query = event.target.value.toLowerCase();
    this.filtered_track_list = this.track_list.filter(
      (item) => item[1].toLowerCase().includes(query)
    );
  }

  ngOnInit() {}
}