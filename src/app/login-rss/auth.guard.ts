import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      const user = await Parse.User.currentAsync();
      if (!user) {
        this.router.navigate(['/login-rss']); // Перенаправление на страницу логина
        return false;
      }
      return true;
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error);
      this.router.navigate(['/login-rss']); // Перенаправление на страницу логина
      return false;
    }
  }
}
