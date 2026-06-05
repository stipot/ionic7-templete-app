import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertController } from '@ionic/angular';

interface Lesson {
  pairNumber: number;
  subject: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  type: string;
}

interface ScheduleDay {
  date: string;
  dayLabel: string;
  lessons: Lesson[];
}

type FacultyData = Record<string, Record<string, string[]>>;

const STORAGE_KEY = 'muiv_schedule_selection';
const API_STORAGE_KEY = 'muiv_schedule_api_base_url';
const DEFAULT_API_BASE_URL = 'https://muiv2.vless-service.digital';

interface SavedSelection {
  faculty: string | null;
  course: string | null;
  group: string | null;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './muiv-schedule.component.html',
  styleUrls: ['./muiv-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuivSheduleComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly alertCtrl = inject(AlertController);

  readonly apiBaseUrl = signal(localStorage.getItem(API_STORAGE_KEY) ?? DEFAULT_API_BASE_URL);

  readonly isLoading = signal(true);
  readonly facultyData = signal<FacultyData>({});

  readonly faculty = signal<string | null>(null);
  readonly course = signal<string | null>(null);
  readonly group = signal<string | null>(null);

  readonly faculties = computed(() => Object.keys(this.facultyData()));

  readonly courses = computed(() => {
    const fac = this.faculty();
    if (!fac) return [];
    const data = this.facultyData()[fac];
    return data ? Object.keys(data) : [];
  });

  readonly groups = computed(() => {
    const fac = this.faculty();
    const crs = this.course();
    if (!fac || !crs) return [];
    const data = this.facultyData()[fac];
    return data?.[crs] ?? [];
  });

  readonly allSelected = computed(() =>
    this.faculty() !== null && this.course() !== null && this.group() !== null
  );

  readonly scheduleDays = signal<ScheduleDay[]>([]);
  readonly currentWeekIndex = signal(0);

  readonly weekRanges = computed(() => {
    const days = this.scheduleDays();
    if (!days.length) {
      return [];
    }
    const ranges: { start: number; end: number }[] = [];
    let start = 0;
    for (let i = 1; i < days.length; i++) {
      if (days[i].dayLabel.trim().startsWith('Пн')) {
        ranges.push({ start, end: i });
        start = i;
      }
    }
    ranges.push({ start, end: days.length });
    return ranges;
  });

  readonly visibleWeekDays = computed(() => {
    const ranges = this.weekRanges();
    const days = this.scheduleDays();
    if (!ranges.length) {
      return [];
    }
    const wi = Math.min(this.currentWeekIndex(), ranges.length - 1);
    const { start, end } = ranges[wi];
    return days.slice(start, end).map((day, offset) => ({
      day,
      globalIndex: start + offset,
    }));
  });

  readonly canPrevWeek = computed(() => this.currentWeekIndex() > 0);
  readonly canNextWeek = computed(() => this.currentWeekIndex() < this.weekRanges().length - 1);

  readonly currentWeekLabel = computed(() => {
    const items = this.visibleWeekDays();
    if (!items.length) {
      return '';
    }
    const first = items[0].day.date;
    const last = items[items.length - 1].day.date;
    return `${first} – ${last}`;
  });

  readonly activeDayIndex = signal(0);

  readonly visibleSlots = computed(() => {
    const day = this.scheduleDays()[this.activeDayIndex()];
    const lessons = day?.lessons ?? [];
    const extended = lessons.some((item) => item.pairNumber > 6);
    const count = extended ? 8 : 6;
    return Array.from({ length: count }, (_, index) => {
      const pairNumber = index + 1;
      const lesson = lessons.find((item) => item.pairNumber === pairNumber);
      return { pairNumber, lesson: lesson ?? null };
    });
  });

  constructor() {
    effect(() => {
      const fac = this.faculty();
      const crs = this.course();
      const grp = this.group();
      if (fac !== null && crs !== null && grp !== null) {
        this.saveSelection({ faculty: fac, course: crs, group: grp });
        this.loadSchedule(fac, crs, grp);
      } else {
        this.scheduleDays.set([]);
        this.activeDayIndex.set(0);
        this.currentWeekIndex.set(0);
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const ranges = this.weekRanges();
      if (!ranges.length) {
        return;
      }
      const i = this.currentWeekIndex();
      if (i > ranges.length - 1) {
        this.currentWeekIndex.set(ranges.length - 1);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.loadFacultyData();
  }

  async openMenu(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'API эндпоинт',
      inputs: [
        {
          name: 'url',
          type: 'url',
          value: this.apiBaseUrl(),
          placeholder: DEFAULT_API_BASE_URL,
        },
      ],
      buttons: [
        { text: 'Отмена', role: 'cancel' },
        {
          text: 'Сохранить',
          handler: (data) => {
            const url = data.url?.trim();
            if (!url) return;
            this.apiBaseUrl.set(url);
            localStorage.setItem(API_STORAGE_KEY, url);
            this.loadFacultyData();
          },
        },
      ],
    });
    await alert.present();
  }

  private loadFacultyData(): void {
    this.isLoading.set(true);

    this.http.get<FacultyData>(`${this.apiBaseUrl()}/structure`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.facultyData.set(data);
          this.restoreSelection();
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  private restoreSelection(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved: SavedSelection = JSON.parse(raw);
      const data = this.facultyData();

      if (saved.faculty && data[saved.faculty]) {
        this.faculty.set(saved.faculty);

        if (saved.course && data[saved.faculty][saved.course]) {
          this.course.set(saved.course);

          if (saved.group && data[saved.faculty][saved.course].includes(saved.group)) {
            this.group.set(saved.group);
          }
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private saveSelection(sel: SavedSelection): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sel));
  }

  private loadSchedule(faculty: string, course: string, group: string): void {
    const params = new HttpParams()
      .set('faculty', faculty)
      .set('course', course)
      .set('group', group);

    this.http.get<ScheduleDay[]>(`${this.apiBaseUrl()}/schedule`, { params })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (days) => {
          this.scheduleDays.set(days ?? []);
          this.activeDayIndex.set(0);
          this.currentWeekIndex.set(0);
        },
        error: () => {
          this.scheduleDays.set([]);
          this.activeDayIndex.set(0);
          this.currentWeekIndex.set(0);
        },
      });
  }

  onFacultyChange(value: string): void {
    this.faculty.set(value);
    this.course.set(null);
    this.group.set(null);
  }

  onCourseChange(value: string): void {
    this.course.set(value);
    this.group.set(null);
  }

  onGroupChange(value: string): void {
    this.group.set(value);
  }

  selectDay(index: number): void {
    this.activeDayIndex.set(index);
  }

  previousWeek(): void {
    if (!this.canPrevWeek()) {
      return;
    }
    this.currentWeekIndex.update((value) => value - 1);
    this.syncActiveDayToVisibleWeek();
  }

  nextWeek(): void {
    if (!this.canNextWeek()) {
      return;
    }
    this.currentWeekIndex.update((value) => value + 1);
    this.syncActiveDayToVisibleWeek();
  }

  private syncActiveDayToVisibleWeek(): void {
    const ranges = this.weekRanges();
    const wi = this.currentWeekIndex();
    const range = ranges[wi];
    if (!range) {
      return;
    }
    const active = this.activeDayIndex();
    if (active < range.start || active >= range.end) {
      this.activeDayIndex.set(range.start);
    }
  }

  trackByVisibleDay(_: number, item: { day: ScheduleDay; globalIndex: number }): string {
    return String(item.globalIndex);
  }

  trackBySlot(_: number, slot: { pairNumber: number }): number {
    return slot.pairNumber;
  }

  lessonTypeClass(type: Lesson['type']): string {
    switch (type) {
      case 'Лекция':
        return 'lesson-type lesson-type--lecture';
      case 'СПЗ':
        return 'lesson-type lesson-type--practice';
      case 'Консультация':
        return 'lesson-type lesson-type--consult';
      default:
        return 'lesson-type lesson-type--default';
    }
  }

  lessonContentSolo(slot: { lesson: Lesson | null }): boolean {
    const lesson = slot.lesson;
    if (!lesson) {
      return true;
    }
    return !this.hasMeaningfulLessonType(lesson.type);
  }

  hasMeaningfulLessonType(type: string | null | undefined): boolean {
    const raw = type?.trim();
    if (!raw) {
      return false;
    }
    return !/^[\u2014\u2013\u002D\u2212]+$/.test(raw);
  }

  hasSlotTime(slot: { lesson: Lesson | null }): boolean {
    const lesson = slot.lesson;
    if (!lesson) {
      return false;
    }
    return Boolean(lesson.timeStart?.trim() && lesson.timeEnd?.trim());
  }
}
