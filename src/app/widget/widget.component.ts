import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { MoonService } from './widget.service';
import { Subscription } from 'rxjs';

interface Widget {
  id: string
  title: string
  data: any
  type: 'basic' | 'counter' | 'notes' | 'stopwatch'
  icon: string
}

interface Widget {
  id: string
  title: string
  data: any
  type: 'basic' | 'counter' | 'notes' | 'stopwatch'
  icon: string
}

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit, OnDestroy {
  loc: any = {};
  currentDate: Date = new Date();
  
  mainWidgets: Widget[] = [
    { 
      id: 'weather', 
      title: 'Погода в Москве', 
      data: { temperature: null, description: null },
      type: 'basic',
      icon: 'partly-sunny'
    },
    { 
      id: 'time', 
      title: 'Текущее время', 
      data: { time: this.getCurrentTime(), date: this.getCurrentDate() },
      type: 'basic', 
      icon: 'time'
    },
    { 
      id: 'moon', 
      title: 'Фаза Луны', 
      data: { phase: null, emoji: null, age: null, description: null },
      type: 'basic',
      icon: 'moon'
    }
  ];

  customWidgets: Widget[] = [];
  private moonSubscription!: Subscription;
  private weatherSubscription!: Subscription;
  private timeUpdateInterval: any;
  isLoading: boolean = true;

  constructor(
    @Inject(HttpClient) private http: HttpClient,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private moonService: MoonService
  ) { }

  ngOnInit() {
    this.loadCustomWidgets();
    this.loadAllData();
    this.startTimeUpdate();
  }

  ngOnDestroy() {
    if (this.moonSubscription) {
      this.moonSubscription.unsubscribe();
    }
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }
  }


  private loadAllData() {
    this.isLoading = true;
    
    this.moonSubscription = this.moonService.getLocale().subscribe({
      next: (locale) => {
        this.loc = locale;
        this.getWeatherData();
        this.getMoonPhase();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading locale:', error);
        this.isLoading = false;
      }
    });
  }

  private loadWidgetData() {
    this.moonSubscription = this.moonService.loadWidgetData().subscribe({
      next: (data: any) => {
        this.loc = data.locale;
        this.getWeatherData();
        this.getMoonPhase();
      },
      error: (error: any) => {
        console.error('Ошибка загрузки данных:', error);
        this.getWeatherData();
      }
    });
  }

  getMoonPhase() {
    this.moonService.calculateMoonPhase(this.currentDate).subscribe({
      next: (moonData) => {
        this.mainWidgets[2].data = moonData;
      },
      error: (error: any) => {
        console.error('Error calculating moon phase:', error);
      }
    });
  }

  loadCustomWidgets() {
    const saved = localStorage.getItem('customWidgets');
    if (saved) {
      try {
        this.customWidgets = JSON.parse(saved);
        
        this.customWidgets.forEach(widget => {
          if (widget.type === 'stopwatch' && widget.data?.isRunning) {
            setTimeout(() => {
              this.startStopwatch(widget);
            }, 0);
          }
        });
      } catch (error) {
        console.error('Error loading custom widgets:', error);
        this.customWidgets = [];
      }
    }
  }

  saveCustomWidgets() {
    localStorage.setItem('customWidgets', JSON.stringify(this.customWidgets));
  }

  async addCustomWidget() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Выберите тип виджета',
      buttons: [
        {
          text: 'Заметки',
          icon: 'document-text',
          handler: () => {
            this.showWidgetConfigAlert('notes');
          }
        },
        {
          text: 'Счетчик',
          icon: 'stats-chart',
          handler: () => {
            this.showWidgetConfigAlert('counter');
          }
        },
        {
          text: 'Секундомер',
          icon: 'stopwatch',
          handler: () => {
            this.showWidgetConfigAlert('stopwatch');
          }
        },
        {
          text: 'Простой текст',
          icon: 'text',
          handler: () => {
            this.showWidgetConfigAlert('basic');
          }
        },
        {
          text: 'Отмена',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async showWidgetConfigAlert(type: string) {
    const inputs: any[] = [
      {
        name: 'title',
        type: 'text',
        placeholder: 'Название виджета',
        value: this.getDefaultTitle(type)
      }
    ];

    if (type === 'notes' || type === 'basic') {
      inputs.push({
        name: 'content',
        type: 'textarea',
        placeholder: 'Текст виджета',
        value: ''
      });
    }

    const alert = await this.alertController.create({
      header: 'Настройки виджета',
      inputs: inputs,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel'
        },
        {
          text: 'Добавить',
          handler: (data) => {
            if (data) {
              this.createCustomWidget({
                title: data.title || this.getDefaultTitle(type),
                type: type,
                content: data.content || ''
              });
            }
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  getDefaultTitle(type: string): string {
    const titles: any = {
      'notes': 'Мои заметки',
      'counter': 'Мой счетчик', 
      'stopwatch': 'Секундомер',
      'basic': 'Мой текст'
    };
    return titles[type] || 'Новый виджет';
  }

  createCustomWidget(config: any) {
    const newWidget: Widget = {
      id: Date.now().toString(),
      title: config.title,
      data: this.getInitialData(config.type, config),
      type: config.type,
      icon: this.getIconForType(config.type)
    };

    this.customWidgets.push(newWidget);
    this.saveCustomWidgets();
  }

  getIconForType(type: string): string {
    const icons: any = {
      'notes': 'document-text',
      'counter': 'stats-chart',
      'stopwatch': 'stopwatch',
      'basic': 'text'
    };
    return icons[type] || 'cube';
  }

  getInitialData(type: string, config: any): any {
    switch (type) {
      case 'counter':
        return { 
          value: 0 
        };
      case 'stopwatch':
        return {
          time: 0,
          isRunning: false,
          startTime: 0,
          laps: [],
          intervalId: null
        };
      case 'notes':
      case 'basic':
        return { 
          content: config.content || '' 
        };
      default:
        return { 
          content: config.content || '' 
        };
    }
  }

  startStopwatch(widget: Widget) {
    if (widget.type === 'stopwatch') {
      if (!widget.data.isRunning) {
        widget.data.isRunning = true;
        widget.data.startTime = Date.now() - widget.data.time;
        
        const updateTime = () => {
          if (widget.data.isRunning) {
            widget.data.time = Date.now() - widget.data.startTime;
            this.saveCustomWidgets();
          }
        };

        widget.data.intervalId = setInterval(updateTime, 10);
      }
    }
  }

  stopStopwatch(widget: Widget) {
    if (widget.type === 'stopwatch' && widget.data.isRunning) {
      widget.data.isRunning = false;
      if (widget.data.intervalId) {
        clearInterval(widget.data.intervalId);
        widget.data.intervalId = null;
      }
      this.saveCustomWidgets();
    }
  }

  resetStopwatch(widget: Widget) {
    if (widget.type === 'stopwatch') {
      this.stopStopwatch(widget);
      widget.data.time = 0;
      widget.data.laps = [];
      this.saveCustomWidgets();
    }
  }

  lapStopwatch(widget: Widget) {
    if (widget.type === 'stopwatch' && widget.data.isRunning) {
      const lapTime = this.formatTime(widget.data.time);
      widget.data.laps.unshift({
        number: widget.data.laps.length + 1,
        time: lapTime,
        timestamp: Date.now()
      });
      
      if (widget.data.laps.length > 20) {
        widget.data.laps = widget.data.laps.slice(0, 20);
      }
      
      this.saveCustomWidgets();
    }
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }
  }

  incrementCounter(widget: Widget) {
    if (widget.type === 'counter' && widget.data?.value !== undefined) {
      widget.data.value++;
      this.saveCustomWidgets();
    }
  }

  decrementCounter(widget: Widget) {
    if (widget.type === 'counter' && widget.data?.value !== undefined) {
      widget.data.value = Math.max(0, widget.data.value - 1);
      this.saveCustomWidgets();
    }
  }

  resetCounter(widget: Widget) {
    if (widget.type === 'counter') {
      widget.data.value = 0;
      this.saveCustomWidgets();
    }
  }

  removeCustomWidget(widgetId: string) {
    const widget = this.customWidgets.find(w => w.id === widgetId);
    if (widget && widget.type === 'stopwatch' && widget.data.isRunning) {
      this.stopStopwatch(widget);
    }
    
    this.customWidgets = this.customWidgets.filter(widget => widget.id !== widgetId);
    this.saveCustomWidgets();
  }

  getWeatherData() {
    const url = 'https://wttr.in/Moscow?format=j1';
    
    this.weatherSubscription = this.http.get(url).subscribe({
      next: (data: any) => {
        const current = data.current_condition[0];
        this.mainWidgets[0].data = {
          temperature: `${current.temp_C}°C`,
          description: current.weatherDesc[0].value,
        };
        console.log('Weather data loaded:', this.mainWidgets[0].data);
      },
      error: (error: any) => {
        console.log('Ошибка загрузки погоды:', error);
        this.mainWidgets[0].data = {
          temperature: 'Нет данных',
          description: 'Ошибка загрузки'
        };
      }
    });
  }

  startTimeUpdate() {
    this.timeUpdateInterval = setInterval(() => {
      this.currentDate = new Date();
      this.mainWidgets[1].data = {
        time: this.currentDate.toLocaleTimeString(),
        date: this.currentDate.toLocaleDateString()
      };

      if (new Date().getSeconds() === 0) {
        this.getMoonPhase();
      }
    }, 1000);
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}