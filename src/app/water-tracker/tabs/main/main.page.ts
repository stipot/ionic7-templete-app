import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { GoalService } from '../../services/goal.service';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { waterTrackerApp } from '../../firebase-config-water-tracker';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  selectedDate: string = new Date().toISOString();  // Текущая дата
  dailyGoal: number = 2000;
  customAmount: number = 0;
  currentWater: number = 0;
  history: { time: string; amount: number }[] = [];
  userId: string | null = null;

  constructor(
    private goalService: GoalService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {}

  async ngOnInit() {
    const savedGoal = localStorage.getItem('dailyGoal');
    const auth = getAuth(waterTrackerApp);
    const user = auth.currentUser;

    if (savedGoal) {
      this.dailyGoal = parseInt(savedGoal, 10);
    }
  
    if (user) {
      this.userId = user.uid;
      await this.loadStatistics();
  
      this.goalService.dailyGoal$.subscribe((goal) => {
        console.log("Updated goal in component:", goal);
        this.dailyGoal = goal ?? 2000;
      });
  
      const initialGoal = await this.goalService.fetchDailyGoal(this.userId);
      if (initialGoal !== null) {
        console.log("Initial daily goal:", initialGoal);
      }
    } else {
      console.error("User not authenticated.");
    }

    this.loadStatistics();
  }

  get formattedDate(): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const date = new Date(this.selectedDate);
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  }

  changeDate(direction: number) {
    const date = new Date(this.selectedDate);
    const today = new Date();
    date.setDate(date.getDate() + direction);

    if (date > today) {
      this.showToast("Вы не можете выбрать будущее!");
      return;
    }

    this.selectedDate = date.toISOString();
    this.loadStatistics();
  }

  async loadStatistics() {
    const dateKey = this.selectedDate.split('T')[0];
  
    const savedWaterAmount = await this.goalService.fetchWaterAmount(dateKey);
    if (savedWaterAmount !== null) {
      this.currentWater = savedWaterAmount;
    } else {
      this.currentWater = 0;
    }
  
    const savedHistory = await this.goalService.fetchWaterHistory(dateKey);
    if (savedHistory) {
      this.history = savedHistory;
    } else {
      this.history = [];
    }
  
    console.log(`Загружено для ${dateKey}: ${this.currentWater} мл, История:`, this.history);
  }  

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    this.loadStatistics();
  }

  async addWater(amount: number) {
    this.currentWater += amount;
  
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.history.unshift({ time, amount });
  
    await this.saveStatistics();
  
    await this.goalService.updateLast7DaysData();
  
    console.log(`Добавлено ${amount} мл. Текущее значение: ${this.currentWater} мл. История:`, this.history);
  }  
  
  updateCustomAmount(event: any) {
    const value = event.target.value;
    this.customAmount = value ? Number(value) : 0;
  }

  async addCustomWater() {
    if (this.customAmount !== null && this.customAmount > 0) {
      this.currentWater += this.customAmount;
  
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.history.unshift({ time, amount: this.customAmount });
  
      await this.saveStatistics();
  
      await this.goalService.updateLast7DaysData();
  
      console.log(`Добавлено кастомное значение: ${this.customAmount} мл. Текущее значение: ${this.currentWater} мл. История:`, this.history);
  
      this.customAmount = 0;
    }
  }
  
  addHistory(amount: number) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.history.unshift({ time, amount });
  }

  async saveStatistics() {
    const dateKey = this.selectedDate.split('T')[0];
  
    await this.goalService.saveWaterAmount(dateKey, this.currentWater);

    console.log(`Сохраняем историю для ${dateKey}:`, history);
    await this.goalService.saveWaterHistory(dateKey, this.history);
  
    console.log(`Сохранено для ${dateKey}: ${this.currentWater} мл, История:`, this.history);
  }  

  resetDay() {
    this.currentWater = 0;
    this.history = [];
    this.saveStatistics();
  }

  async showToast(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 2000;
    toast.position = 'bottom';
    document.body.appendChild(toast);
    await toast.present();
  }

  async deleteHistoryItem(index: number) {
    if (index < 0 || index >= this.history.length) {
      console.error('Некорректный индекс истории.');
      return;
    }
  
    const amountToRemove = this.history[index].amount;
    this.currentWater -= amountToRemove;
    this.history.splice(index, 1);
  
    await this.saveStatistics();
  
    console.log(`Удалено ${amountToRemove} мл. Новое значение за день: ${this.currentWater} мл.`);
  }
  

  async saveWaterToDatabase(dateKey: string, amount: number) {
    if (!this.userId) {
      console.error('Пользователь не найден.');
      return;
    }
  
    const waterDocRef = doc(this.goalService.firestore, `users/${this.userId}/waterData/${dateKey}`);
    await setDoc(waterDocRef, { amount });
  
    console.log(`Данные сохранены в Firebase: ${amount} мл для ${dateKey}`);
  }

  get progress(): number {
    return Math.min(this.currentWater / this.dailyGoal, 1);
  }
  
  get progressColor(): string {
    if (this.progress < 1) {
      return '#3880ff';
    } else {
      return '#28a745';
    }
  }  
}
