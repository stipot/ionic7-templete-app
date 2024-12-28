// mood-calendar.component.ts
import { Component, OnInit } from '@angular/core';
import { MoodCalendarService } from './mood.service';
import { MoodEntry, MoodType, MOODS } from './mood.interface';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mood-calendar',
  templateUrl: './mood-calendar.component.html',
  styleUrls: ['./mood-calendar.component.scss']
})
export class MoodCalendarComponent implements OnInit {
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  calendarDays: any[][] = [];
  weekDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  moods = MOODS;
  monthlyStats: { [key in MoodType]: number } = {
    happy: 0, relaxed: 0, grateful: 0,
    tired: 0, unsure: 0, bored: 0,
    angry: 0, stressed: 0, sad: 0
  };

  constructor(
    private moodService: MoodCalendarService,
    private alertController: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.initializeCalendar();
    this.calculateMonthStats();
  }

  private initializeCalendar() {
    this.generateCalendar();
    this.selectedDate = new Date();
  }

  private generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let currentWeek: any[] = [];
    this.calendarDays = [];

    let dayOfWeek = firstDay.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      currentWeek.push(this.createDayObject(date, false));
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      currentWeek.push(this.createDayObject(date, true));

      if (currentWeek.length === 7) {
        this.calendarDays.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      const remainingDays = 7 - currentWeek.length;
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(year, month + 1, i);
        currentWeek.push(this.createDayObject(date, false));
      }
      this.calendarDays.push(currentWeek);
    }
  }

  private createDayObject(date: Date, isCurrentMonth: boolean) {
    const moodEntry = this.moodService.getEntryByDate(date);
    return {
      date,
      isCurrentMonth,
      moodEntry,
      isToday: this.isToday(date),
      isSelected: this.isSelected(date)
    };
  }

  private calculateMonthStats() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    this.monthlyStats = this.moodService.getMoodStats(startDate, endDate);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date): boolean {
    if (!this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
    this.calculateMonthStats();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
    this.calculateMonthStats();
  }

  async selectDate(date: Date) {
    this.selectedDate = date;
    await this.showMoodSelector();
  }

  async showMoodSelector() {
    const header = await this.translate.get('CALENDAR.HOW_ARE_YOU').toPromise();
    const cancel = await this.translate.get('CALENDAR.CANCEL').toPromise();
  
    const moodButtons = await Promise.all(
      Object.values(this.moods).map(async mood => ({
        text: `${mood.icon} ${await this.translate.get(mood.translationKey).toPromise()}`,
        cssClass: 'mood-select-button',
        handler: () => {
          this.saveMoodEntry(mood.type);
          return true;
        }
      }))
    );
  
    const alert = await this.alertController.create({
      header: header,
      buttons: [
        ...moodButtons,
        {
          text: cancel,
          role: 'cancel',
          handler: () => true
        }
      ],
      cssClass: 'mood-selector-alert'
    });
  
    await alert.present();
  }

  private saveMoodEntry(mood: MoodType) {
    if (!this.selectedDate) return;

    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: this.selectedDate,
      mood: mood
    };

    this.moodService.addMoodEntry(entry);
    this.generateCalendar();
    this.calculateMonthStats();
  }

  getMoodIcon(entry?: MoodEntry): string {
    return entry ? this.moods[entry.mood].icon : '';
  }

  getMoodColor(entry?: MoodEntry): string {
    return entry ? this.moods[entry.mood].color : 'transparent';
  }
}