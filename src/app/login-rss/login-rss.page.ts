import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Parse from 'parse';

@Component({
  selector: 'app-login-rss',
  templateUrl: './login-rss.page.html',
  styleUrls: ['./login-rss.page.scss'],
})
export class LoginRssPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  async login() {
    try {
      const user = await Parse.User.logIn(this.username, this.password);
      this.router.navigate(['/rss-data']); // Перенаправление на страницу RSS-Data
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  }

  register() {
    this.router.navigate(['/register']); // Перенаправление на страницу регистрации
  }
}


