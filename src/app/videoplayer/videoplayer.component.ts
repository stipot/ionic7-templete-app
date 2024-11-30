import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

interface Video {
  src: string;
  thumbnail: string;
  title: string;
}

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef;
  @ViewChild('playPauseBtn', { static: true }) playPauseBtn!: ElementRef;
  @ViewChild('muteBtn', { static: true }) muteBtn!: ElementRef;
  @ViewChild('fullScreenBtn', { static: true }) fullScreenBtn!: ElementRef;
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef;
  @ViewChild('speedBtn', { static: true }) speedBtn!: ElementRef;

  videos: Video[] = [
    { src: '/assets/videos/kanye.mp4', thumbnail: '/assets/thumbnails/kanye.jpg', title: 'Kanye West' },
    { src: '/assets/videos/drake.mp4', thumbnail: '/assets/thumbnails/drake.jpg', title: 'Drake' },
    { src: '/assets/videos/eminem.mp4', thumbnail: '/assets/thumbnails/eminem.jpg', title: 'Eminem' }
  ];

  controlsVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const video = this.videoPlayer.nativeElement;
    const playPauseBtn = this.playPauseBtn.nativeElement;
    const muteBtn = this.muteBtn.nativeElement;
    const fullScreenBtn = this.fullScreenBtn.nativeElement;
    const progressBar = this.progressBar.nativeElement;
    const speedBtn = this.speedBtn.nativeElement;

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = 'Pause';
      } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
      }
    });

    // Mute/Unmute functionality
    muteBtn.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        muteBtn.textContent = 'Mute';
      } else {
        video.muted = true;
        muteBtn.textContent = 'Unmute';
      }
    });

    // Full screen functionality
    fullScreenBtn.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) { // Firefox
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { // IE/Edge
        video.msRequestFullscreen();
      }
    });

    // Progress bar functionality
    video.addEventListener('timeupdate', () => {
      progressBar.value = (video.currentTime / video.duration) * 100;
    });

    progressBar.addEventListener('input', () => {
      video.currentTime = (progressBar.value / 100) * video.duration;
    });

    // Speed control functionality
    speedBtn.addEventListener('click', () => {
      const speedOptions = speedBtn.nextElementSibling;
      speedOptions.style.display = speedOptions.style.display === 'block' ? 'none' : 'block';
    });
  }

  setSpeed(speed: number): void {
    const video = this.videoPlayer.nativeElement;
    video.playbackRate = speed;
    this.speedBtn.nativeElement.textContent = `x${speed}`;
  }

  changeVideo(video: Video): void {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.src = video.src;
    videoElement.load();
    videoElement.play();
  }

  showControls(): void {
    this.controlsVisible = true;
  }

  hideControls(): void {
    this.controlsVisible = false;
  }
}