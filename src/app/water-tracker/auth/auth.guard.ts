import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { waterTrackerApp } from '../firebase-config-water-tracker';

export const authGuard = () => {
  const router = inject(Router);
  const auth = getAuth(waterTrackerApp);

  return new Promise<boolean>((resolve) => {
    console.log('AuthGuard вызван для маршрута:', router.url);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Пользователь найден:', user.email);
        resolve(true);
      } else {
        console.log('Пользователь не найден. Перенаправляем на логин.');
        router.navigate(['/water-tracker/login']).then(() => resolve(false));
      }
    });
  });
};