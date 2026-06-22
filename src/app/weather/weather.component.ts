import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

interface WeatherData {
  temperature: number;
  humidity: number;
  city: string;
  icon: string;
  condition: string;    
  windSpeed: number; 
  feelsLike: number;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  
  weatherData: WeatherData | null = null;
  currentCity: string = 'Moscow';
  temperature: number = 0;
  feelsLike: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';
  weeklyForecast: any[] = [];
  
  private apiKey: string = '433997e030794166ac495549261104';
  private updateInterval: any;


  monday: string = '';
  tuesday: string = '';
  wednesday: string = '';
  thursday: string = '';
  friday: string = '';
  saturday: string = '';
  sunday: string = '';
  weekdaysArray: string[] = [];

  constructor(private alertController: AlertController, private translate: TranslateService) {
    this.initWeekdays(); 
  }

  ngOnInit() {
    this.loadWeatherData();
    this.startAutoUpdate();
  }
  
  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  initWeekdays() {
    this.monday = this.translate.instant('WEATHER.MONDAY');
    this.tuesday = this.translate.instant('WEATHER.TUESDAY');
    this.wednesday = this.translate.instant('WEATHER.WEDNESDAY');
    this.thursday = this.translate.instant('WEATHER.THURSDAY');
    this.friday = this.translate.instant('WEATHER.FRIDAY');
    this.saturday = this.translate.instant('WEATHER.SATURDAY');
    this.sunday = this.translate.instant('WEATHER.SUNDAY');
    
    this.weekdaysArray = [
      this.monday,
      this.tuesday,
      this.wednesday,
      this.thursday,
      this.friday,
      this.saturday,
      this.sunday
    ];
  }

  async loadWeatherData() {
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${encodeURIComponent(this.currentCity)}&lang=ru&aqi=no`;
      const response = await fetch(weatherUrl);
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Город не найден');
        } else if (response.status === 401) {
          throw new Error('Неверный API ключ');
        } else {
          throw new Error(this.translate.instant('WEATHER.ERROR'));
        }
      }
      
      const data = await response.json();
      
      this.weatherData = {
        temperature: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph / 3.6,
        city: data.location.name,
        icon: 'https:' + data.current.condition.icon,
        feelsLike: Math.round(data.current.feelslike_c)
      };
      
      this.temperature = this.weatherData.temperature;
      this.feelsLike = this.weatherData.feelsLike;
      
      await this.loadForecast();
      
    } catch (error: any) {
      console.error('Ошибка:', error);
      this.errorMessage = error.message || this.translate.instant('WEATHER.LOADING');
    } finally {
      this.isLoading = false;
    }
  }

  async loadForecast() {
    try {
      const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(this.currentCity)}&days=7&lang=ru&aqi=no&alerts=no`;
      const response = await fetch(forecastUrl);
      
      if (!response.ok) {
        throw new Error(this.translate.instant('WEATHER.ERROR'));
      }
      
      const data = await response.json();
      
      this.weeklyForecast = data.forecast.forecastday.map((day: any) => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' });
        
        return {
          date: dayName,
          dayTemp: Math.round(day.day.maxtemp_c),
          nightTemp: Math.round(day.day.mintemp_c),
          condition: day.day.condition.text,
          icon: 'https:' + day.day.condition.icon
        };
      });
      
    } catch (error) {
      console.error('Ошибка прогноза:', error);
      this.weeklyForecast = this.getMockForecast();
    }
  }
  
  getMockForecast(): any[] {
    return this.weekdaysArray.map((date: string, index: number) => ({
      date: date,
      dayTemp: 18 - index,
      nightTemp: 10 - index,
      condition: 'ясно',
      icon: ''
    }));
  }

  getFeelsLikeText(): string {
    if (!this.weatherData) return this.translate.instant('WEATHER.LOADING');
    
    const diff = this.feelsLike - this.temperature;
    const feelsLikeText = this.translate.instant('WEATHER.FEELS_LIKE');
    const butActually = this.translate.instant('WEATHER.BUT_ACTUALLY');
    
    if (diff > 1) {
      return `${feelsLikeText} ${this.feelsLike}°, ${butActually} ${this.temperature}°`;
    } else if (diff < -1) {
      return `${feelsLikeText} ${this.feelsLike}°, ${butActually} ${this.temperature}°`;
    } else {
      return `${feelsLikeText} ${this.temperature}° ${butActually}`;
    }
  }

  async changeCity() {
    const alert = await this.alertController.create({
      header: this.translate.instant('WEATHER.CITY_PLACEHOLDER'),
      inputs: [
        {
          name: 'city',
          type: 'text',
          placeholder: this.translate.instant('WEATHER.CITY_PLACEHOLDER'),
          value: this.currentCity
        }
      ],
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            if (data.city && data.city.trim()) {
              this.currentCity = data.city.trim();
              this.loadWeatherData();
            }
          }
        }
      ]
    });
    
    await alert.present();
  }

  startAutoUpdate() {
    this.updateInterval = setInterval(() => {
      this.loadWeatherData();
    }, 600000);
  }

  refreshWeather() {
    this.loadWeatherData();
  }
}