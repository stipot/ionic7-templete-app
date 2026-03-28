import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  timeInSeconds: number = 300;  // 5 минут
  isRunning: boolean = false;
  private intervalId: any;

  get formattedTime(): string {
    const minutes = Math.floor(this.timeInSeconds / 60);
    const seconds = this.timeInSeconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  startTimer(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      if (this.timeInSeconds > 0) {
        this.timeInSeconds--;
      } else {
        this.stopTimer();
        // здесь можно добавить уведомление
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  resetTimer(): void {
    this.stopTimer();
    this.timeInSeconds = 300;  // сброс к начальному значению
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnInit() {}
}