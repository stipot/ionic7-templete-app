import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { GoalService } from '../../services/goal.service';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { waterTrackerApp } from '../../firebase-config-water-tracker';


const firestore = getFirestore(waterTrackerApp);

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  dailyGoal: number = 2000;
  isDarkTheme: boolean = true;
  userId: string | null = null;

  constructor(
    private goalService: GoalService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {}

  async ngOnInit() {
    const auth = getAuth(waterTrackerApp);
    const user = auth.currentUser;
    
    if (user) {
      this.userId = user.uid;
      await this.goalService.updateLast7DaysData();
    
      this.goalService.dailyGoal$.subscribe((goal) => {
        console.log("Updated goal in component:", goal);
        this.dailyGoal = goal ?? 2000;
      });
    
      await this.goalService.fetchDailyGoal(this.userId);
    }
  }
    


  async saveGoal() {
    try {
      const userId = this.userId;
      if (!userId) {
        console.error('User ID not found.');
        return;
      }
  
      if (this.dailyGoal) {
        await this.goalService.saveDailyGoal(userId, this.dailyGoal);
        console.log('Daily goal saved:', this.dailyGoal);
        this.showToast('Цель успешно сохранена!');
      } else {
        console.error('Daily goal is not set.');
      }
    } catch (error) {
      console.error('Error saving daily goal:', error);
    }
  }
  
  async showGoalInfo() {
    const alert = await this.alertCtrl.create({
      header: 'Как рассчитать цель?',
      message: 'Рекомендуется пить 30 мл воды на 1 кг веса. Например, если вы весите 70 кг, ваша цель — 2100 мл.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  toggleTheme(event: any) {
    document.body.classList.toggle('dark', this.isDarkTheme);
  }

  async confirmClearData() {
    const alert = await this.alertCtrl.create({
      header: 'Очистка данных',
      message: 'Вы уверены, что хотите удалить все ваши данные? Это действие нельзя отменить.',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
        },
        {
          text: 'Очистить',
          handler: () => {
            this.clearData();
          },
        },
      ],
    });
    await alert.present();
  }  

  async clearData() {
    try {
      await this.goalService.clearAllUserData();
  
      localStorage.clear();
  
      await this.goalService.updateLast7DaysData();
  
      this.showToast('Все данные успешно очищены.');
    } catch (error) {
      console.error('Ошибка при очистке данных:', error);
      this.showToast('Произошла ошибка при очистке данных.');
    }
  }  
  
  updateAppState() {
    this.goalService.updateLast7DaysData();
    this.goalService.setDailyGoal(2000);
  }  

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
