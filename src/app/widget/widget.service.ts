import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface MoonPhase {
  name: string;
  emoji: string;
  min: number;
  max: number;
}

export interface MoonData {
  phase: string | null;
  emoji: string | null;
  age: string | null;
  description: string | null;
}

export interface WidgetData {
  moonPhases: MoonPhase[];
  descriptions: { [key: string]: string };
  locale: {
    COMPONENT_TITLE: string;
    LOADING: string;
    MOON_PHASE: string;
    MOON_AGE: string;
    ADD_WIDGET: string;
    DAYS: string;
    INCREMENT: string;
    DECREMENT: string;
    RESET: string;
    START: string;
    STOP: string;
    LAP: string;
    CLEAR: string;
    TIME: string;
    LAPS: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MoonService {
  private widgetData: WidgetData | null = null;

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  loadWidgetData(): Observable<WidgetData> {
    return this.http.get<WidgetData>('assets/sample-data/moon/moon-data.json').pipe(
      map(data => {
        this.widgetData = data as WidgetData;
        return data as WidgetData;
      }),
      catchError((error: any) => {
        console.error('Error loading moon data:', error);
        throw error;
      })
    );
  }

  calculateMoonPhase(date: Date): Observable<MoonData> {
    return new Observable<MoonData>(observer => {
      if (this.widgetData) {
        try {
          const moonData = this.calculateMoonPhaseSync(date, this.widgetData);
          observer.next(moonData);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      } else {
        this.loadWidgetData().subscribe({
          next: (widgetData) => {
            try {
              const moonData = this.calculateMoonPhaseSync(date, widgetData);
              observer.next(moonData);
              observer.complete();
            } catch (error) {
              observer.error(error);
            }
          },
          error: (error) => {
            observer.error(error);
          }
        });
      }
    });
  }

private calculateMoonPhaseSync(date: Date, widgetData: WidgetData): MoonData {
  const moonAge = this.calculateMoonAge(date);
  const phase = this.determineMoonPhase(moonAge, widgetData.moonPhases);
  const daysLabel = widgetData?.locale?.DAYS ?? 'дней';
  return {
    phase: phase.name,
    emoji: phase.emoji,
    age: `${Math.round(moonAge * 10) / 10} ${daysLabel}`,
    description: widgetData.descriptions[phase.name]
  };
}

  private calculateMoonAge(date: Date): number {
    const knownNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
    const currentTime = date.getTime();
    const diffMs = currentTime - knownNewMoon;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const lunarCycle = 29.5305882;
    let moonAge = diffDays % lunarCycle;

    if (moonAge < 0) {
      moonAge += lunarCycle;
    }
    
    return moonAge;
  }

  getLocale(): Observable<WidgetData['locale']> {
    return new Observable<WidgetData['locale']>(observer => {
      if (this.widgetData) {  
        observer.next(this.widgetData.locale);
        observer.complete();
      } else {
        this.loadWidgetData().subscribe({
          next: (widgetData) => {
            observer.next(widgetData.locale);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          }
        });
      }
    });
  }

  private determineMoonPhase(moonAge: number, moonPhases: MoonPhase[]): MoonPhase {
    for (let phase of moonPhases) {
      if (moonAge >= phase.min && moonAge < phase.max) {
        return phase;
      }
    }
  
    return moonPhases[moonPhases.length - 1];
  }
}