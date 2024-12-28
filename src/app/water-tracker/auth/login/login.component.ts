import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { waterTrackerApp } from '../../firebase-config-water-tracker';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const auth = getAuth(waterTrackerApp);
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        console.log('Вход выполнен');
        this.router.navigate(['/water-tracker/tabs/main'], { replaceUrl: true }).then((success) => {
          console.log('Перенаправление успешно:', success);
        });
      })
      .catch((error) => {
        console.error('Ошибка входа или перенаправления:', error.message);
      });
  }
  

  goToRegister() {
    this.router.navigate(['/water-tracker/register']);
  }
}
