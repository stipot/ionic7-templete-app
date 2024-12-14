import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mplayer',
  templateUrl: './mplayer.component.html',
  styleUrls: ['./mplayer.component.scss'],
})
export class MplayerComponent  implements OnInit {
  public progress = 0;
  public player_status = 'play';

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
  }

  prev_track() {
    this.set_zero_bar();
  }

  ngOnInit() {}

}