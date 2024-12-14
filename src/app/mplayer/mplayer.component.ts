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

  constructor() {
    setInterval(() => {
      if (this.player_status == 'pause') {
        this.progress += 0.001;
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
    } else {
      this.player_status = 'pause';
    }
  }

  next_track() {
    this.set_zero_bar();
    // this.set_track('NEbula', 'OG Budda');
  }

  prev_track() {
    this.set_zero_bar();
  }

  ngOnInit() {}

}