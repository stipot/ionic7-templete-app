import { Injectable } from '@angular/core';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { waterTrackerApp } from '../firebase-config-water-tracker';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
    public firestore = getFirestore(waterTrackerApp);
    private dailyGoalSubject = new BehaviorSubject<number | null>(null); // Начальное значение null
    private last7DaysDataSubject = new BehaviorSubject<{ date: string; amount: number }[]>([]);
    public last7DaysData$ = this.last7DaysDataSubject.asObservable();
    dailyGoal$ = this.dailyGoalSubject.asObservable();
  
    // Получить цель из Firebase
    async fetchDailyGoal(userId: string): Promise<number | null> {
      const goalDocRef = doc(this.firestore, `users/${userId}/settings/dailyGoal`);
      const docSnap = await getDoc(goalDocRef);
      if (docSnap.exists()) {
        const value = docSnap.data()['value'] as number;

        this.dailyGoalSubject.next(value);
        localStorage.setItem('dailyGoal', value.toString());
        console.log('Fetched goal:', value);
        return value;
      } else {
        console.log('Document not found.');
        return null;
      }
    }
  
    // Сохранить новую цель
    async saveDailyGoal(userId: string, dailyGoal: number): Promise<void> {
        const goalDocRef = doc(this.firestore, `users/${userId}/settings/dailyGoal`);
        await setDoc(goalDocRef, { value: dailyGoal });

        this.dailyGoalSubject.next(dailyGoal);
        localStorage.setItem('dailyGoal', dailyGoal.toString());
        console.log('Goal saved and updated:', dailyGoal);
    }
  
    // Получить текущее значение локально
    getDailyGoal(): number {
        return this.dailyGoalSubject.value ?? 2000;
    }

    // Сохраняем количество воды в Firebase
    async saveWaterAmount(dateKey: string, amount: number): Promise<void> {
      const userId = getAuth(waterTrackerApp).currentUser?.uid;
      if (!userId) {
        console.error('Пользователь не найден.');
        return;
      }
    
      const waterDocRef = doc(this.firestore, `users/${userId}/waterData/${dateKey}`);
      await setDoc(waterDocRef, { amount }, { merge: true });
    }
    
    async fetchWaterAmount(dateKey: string): Promise<number | null> {
      const userId = getAuth(waterTrackerApp).currentUser?.uid;
      if (!userId) return null;
    
      const waterDocRef = doc(this.firestore, `users/${userId}/waterData/${dateKey}`);
      const docSnap = await getDoc(waterDocRef);
    
      return docSnap.exists() ? docSnap.data()['amount'] : null;
    }    

    async saveWaterHistory(dateKey: string, history: { time: string; amount: number }[]): Promise<void> {
      const userId = getAuth(waterTrackerApp).currentUser?.uid;
      if (!userId) {
        console.error('Пользователь не найден.');
        return;
      }
    
      const historyDocRef = doc(this.firestore, `users/${userId}/waterData/${dateKey}`);
      await setDoc(historyDocRef, { history }, { merge: true }); // Сохраняем историю
    }      
    
    async fetchWaterHistory(dateKey: string): Promise<{ time: string; amount: number }[] | null> {
      const userId = getAuth(waterTrackerApp).currentUser?.uid;
      if (!userId) return null;
    
      const historyDocRef = doc(this.firestore, `users/${userId}/waterData/${dateKey}`);
      const docSnap = await getDoc(historyDocRef);
    
      if (docSnap.exists()) {
        const data = docSnap.data()['history'];
        return Array.isArray(data) ? data : []; // Проверяем, что это массив
      } else {
        return [];
      }
    }
      
    async updateLast7DaysData() {
      const today = new Date();
      const last7DaysData = [];
    
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
    
        const dateKey = date.toISOString().split('T')[0];
        const waterAmount = await this.fetchWaterAmount(dateKey);
    
        last7DaysData.push({
          date: date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
          }),
          amount: waterAmount || 0,
        });
      }
    
      this.last7DaysDataSubject.next(last7DaysData); // Обновляем поток
    }

    async clearAllUserData(): Promise<void> {
      const userId = getAuth(waterTrackerApp).currentUser?.uid;
      if (!userId) {
        console.error('Пользователь не найден.');
        return;
      }
    
      const userWaterDataRef = collection(this.firestore, `users/${userId}/waterData`);
    
      try {
        const querySnapshot = await getDocs(userWaterDataRef);
    
        const resetPromises = querySnapshot.docs.map(async (docSnap) => {
          const docRef = docSnap.ref;
          await setDoc(docRef, { amount: 0, history: [] }, { merge: true });
        });
    
        await Promise.all(resetPromises);
    
        console.log('Все данные пользователя успешно обнулены.');
      } catch (error) {
        console.error('Ошибка при очистке данных пользователя:', error);
      }
    }

    setDailyGoal(newGoal: number): void {
      this.dailyGoalSubject.next(newGoal);
    }    
}
