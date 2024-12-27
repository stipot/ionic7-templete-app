import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mplayer',
  templateUrl: './mplayer.component.html',
  styleUrls: ['./mplayer.component.scss'],
})
export class MplayerComponent  implements OnInit {
  public progress = 0;
  public player_status = 'play';

  public track_title = 'Music Ttitle';
  public track_author = 'Author Name';

  // public track_list = ['https://opengameart.org/sites/default/files/audio_preview/awesomeness.wav.ogg', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3']
  public track_list = [
    ['https://opengameart.org/sites/default/files/audio_preview/awesomeness.wav.ogg', 'Menu Music', 'Adventure', '0', 'selected'],
    ['https://opengameart.org/sites/default/files/audio_preview/seashore.mp3.ogg', 'Fight Music', 'Adventure', '1', ''],
    ['https://opengameart.org/sites/default/files/audio_preview/yesterbreeze.mp3.ogg', 'Strong Start', 'RPG Music', '2', ''],
    ['https://opengameart.org/sites/default/files/audio_preview/game_2.mp3.ogg', 'Intro Music', 'Factory', '3', ''],
    ['https://opengameart.org/sites/default/files/audio_preview/jkjkke%20-%20dream_0.mp3.ogg', 'Menu Music', 'Low Light', '4', '']
  ]

  // public track_element = document.getElementById('audio_test');

  public track_count = 0
  public track = new Audio(this.track_list[this.track_count][0]);
  public track_duration = this.track.duration;

  public default_speed_track = 0.001
  public speed_track = this.default_speed_track
  

  constructor() {
    this.track_title = this.track_list[this.track_count][1];
    this.track_author = this.track_list[this.track_count][2];

    setInterval(() => {
      if (this.player_status == 'pause') {
          this.progress += this.speed_track;
        if (this.progress > 1) {
          this.set_zero_bar();
        }
      } else {

      }
    }, 100);
  }

  set_track(title:string, author:string) {
    this.track_title = title;
    this.track_author = author;
  }

  set_zero_bar() {
    this.progress = 0;
  }

  change_status() {
    if (this.player_status == 'pause') {
      this.player_status = 'play';
      this.track.pause()
    } else {
      this.player_status = 'pause';
      this.track.play()
      console.log(this.track_duration);
      // console.log(this.track_element.duration);
    }
  }

  next_track() {
    this.track.pause();

    this.track_list[this.track_count][4] = '';

    if (this.track_count < this.track_list.length - 1) {
      this.track_count += 1;
    } else {
      this.track_count = 0
    }

    this.track = new Audio(this.track_list[this.track_count][0]);
    this.set_track(this.track_list[this.track_count][1], this.track_list[this.track_count][2]);
    this.track_list[this.track_count][4] = 'selected';

    this.set_zero_bar();
    if (this.player_status == 'pause') {
      this.track.play();
    }
    console.log
    // this.set_track('NEbula', 'OG Budda');
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

    this.set_zero_bar();
    if (this.player_status == 'pause') {
      this.track.play();
    }
  }

  ngOnInit() {}

}