import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  constructor() { }

  ngOnInit() {}

  toggleVideo() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  stopVideo() {
    const video = this.videoPlayer.nativeElement;
    video.pause();
    video.currentTime = 0;
  }

  setVolume(volume: number) {
    const video = this.videoPlayer.nativeElement;
    video.volume = volume;
  }
}