import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mplayer',
  templateUrl: './mplayer.component.html',
  styleUrls: ['./mplayer.component.scss'],
})
export class MplayerComponent  implements OnInit {
  public progress = 0;

  constructor() {
    setInterval(() => {
      this.progress += 0.001;
      if (this.progress > 1) {
        this.progress = 0;
      }
    }, 100);
  }

  ngOnInit() {}

}