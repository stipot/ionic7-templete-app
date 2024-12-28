import { Component, OnInit } from '@angular/core';
import { getAuth, updateProfile, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { waterTrackerApp } from '../../firebase-config-water-tracker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  displayName: string | null = '';
  userEmail: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const auth = getAuth(waterTrackerApp);
    const user = auth.currentUser;
    if (user) {
      this.displayName = user.displayName;
      this.userEmail = user.email;
    }
  }

  updateProfile() {
    const auth = getAuth(waterTrackerApp);
    const user = auth.currentUser;

    if (user) {
      updateProfile(user, {
        displayName: this.displayName,
      })
        .then(() => {
          console.log('Имя пользователя обновлено');
        })
        .catch((error) => {
          console.error('Ошибка при обновлении профиля:', error);
        });
    }
  }

  resetPassword() {
    const auth = getAuth(waterTrackerApp);
    if (this.userEmail) {
      sendPasswordResetEmail(auth, this.userEmail)
        .then(() => {
          console.log('Письмо для сброса пароля отправлено');
        })
        .catch((error) => {
          console.error('Ошибка при сбросе пароля:', error);
        });
    }
  }

  logout() {
    const auth = getAuth(waterTrackerApp);
    signOut(auth)
      .then(() => {
        console.log('Выход выполнен');
        this.router.navigate(['/water-tracker/login']);
      })
      .catch((error) => {
        console.error('Ошибка при выходе:', error);
      });
  }
}
