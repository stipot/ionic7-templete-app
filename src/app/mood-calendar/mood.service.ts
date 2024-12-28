// mood.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MoodEntry, MoodType } from './mood.interface';

@Injectable({
  providedIn: 'root'
})
export class MoodCalendarService {
  private moodEntries = new BehaviorSubject<MoodEntry[]>([]);

  constructor() {
    // Load initial data from storage
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const storedData = localStorage.getItem('moodEntries');
    if (storedData) {
      const entries = JSON.parse(storedData).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      this.moodEntries.next(entries);
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('moodEntries', JSON.stringify(this.moodEntries.getValue()));
  }

  public getMoodEntries(): Observable<MoodEntry[]> {
    return this.moodEntries.asObservable();
  }

  public addMoodEntry(entry: MoodEntry): void {
    const currentEntries = this.moodEntries.getValue();
    // Remove any existing entry for the same date
    const filteredEntries = currentEntries.filter(
      e => e.date.toDateString() !== entry.date.toDateString()
    );
    this.moodEntries.next([...filteredEntries, entry]);
    this.saveToStorage();
  }

  public getMoodsByMonth(year: number, month: number): MoodEntry[] {
    return this.moodEntries.getValue().filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === year && 
             entryDate.getMonth() === month;
    });
  }

  public getMoodStats(startDate: Date, endDate: Date): { [key in MoodType]: number } {
    const entries = this.moodEntries.getValue().filter(entry => 
      entry.date >= startDate && entry.date <= endDate
    );

    const stats = {
      happy: 0, relaxed: 0, grateful: 0,
      tired: 0, unsure: 0, bored: 0,
      angry: 0, stressed: 0, sad: 0
    };

    entries.forEach(entry => {
      stats[entry.mood]++;
    });

    return stats;
  }

  public getEntryByDate(date: Date): MoodEntry | undefined {
    return this.moodEntries.getValue().find(entry => 
      entry.date.toDateString() === date.toDateString()
    );
  }
}