import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  // Поля ввода
  inputHours: number = 0;
  inputMinutes: number = 5;
  inputSeconds: number = 0;
  
  timerName: string = ''; // Название таймера
  timeInSeconds: number = 300;
  isRunning: boolean = false;
  recentTimers: any[] = []; // Список недавних
  
  private intervalId: any;
  constructor(private translate: TranslateService) { }
  get formattedTime(): string {
    const h = Math.floor(this.timeInSeconds / 3600);
    const m = Math.floor((this.timeInSeconds % 3600) / 60);
    const s = this.timeInSeconds % 60;
    return `${this.padZero(h)}:${this.padZero(m)}:${this.padZero(s)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  startTimer(): void {
    if (this.isRunning) return;
    
    // Если таймер только запущен (не на паузе), рассчитываем время из инпутов
    if (this.timeInSeconds === 0 || !this.intervalId) {
      this.timeInSeconds = (this.inputHours * 3600) + (this.inputMinutes * 60) + this.inputSeconds;
      
      // Сохраняем в недавние
      if (this.timeInSeconds > 0) {
        this.addToRecent();
      }
    }

    if (this.timeInSeconds <= 0) return;

    this.isRunning = true;
    this.intervalId = setInterval(() => {
      if (this.timeInSeconds > 0) {
        this.timeInSeconds--;
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  addToRecent() {
    const newEntry = {
      name: this.timerName || 'Без названия',
      duration: this.formattedTime,
      totalSec: this.timeInSeconds
    };
    this.recentTimers.unshift(newEntry);
    this.recentTimers = this.recentTimers.slice(0, 5); // Храним последние 5
  }

  loadTimer(t: any) {
    this.stopTimer();
    this.timerName = t.name;
    this.timeInSeconds = t.totalSec;
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
    this.timeInSeconds = (this.inputHours * 3600) + (this.inputMinutes * 60) + this.inputSeconds;
  }

  ngOnDestroy() { this.stopTimer(); }
  ngOnInit() {}
}
