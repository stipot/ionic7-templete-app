import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirestoreService } from '../user/firestore.service';
import { ModalController, MenuController } from '@ionic/angular';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public modalController: ModalController,
    private router: Router,
    private firestore: FirestoreService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required)
    });
  }
  async showTermsOfServiceModal() {
    const modal = await this.modalController.create({
      component: TermsOfServiceComponent
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyComponent
    });
    return await modal.present();
  }
  ngOnInit(): void {}

  login() {
    console.log('Начало выполнения метода login()');
    
    if (this.loginForm.valid) {
      console.log('Форма валидна, продолжаем выполнение');
      
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log(`Полученные данные: email=${email}, password=${password}`);
  
      const db = this.firestore.userData;
      console.log('Получен экземпляр Firestore:', db);
  
      const auth = getAuth(db);
      console.log('Получен экземпляр Auth:', auth);
  
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          console.log('Вход выполнен успешно:', userCredential);
  
          const userId = userCredential.user.uid;
          console.log(`UID пользователя: ${userId}`);
  
          const userExists = await this.firestore.checkUserExists(userId);
          console.log(`Результат проверки существования пользователя: ${userExists}`);
  
          if (userExists) {
            console.log('Пользователь существует, перенаправляем на главную страницу');
            this.router.navigate(['/rss-data/tabs/main'], { replaceUrl: true });
          } else {
            console.log('Пользователь не существует, выполняем дополнительные действия');
            // Действия, если пользователь не существует
          }
        })
        .catch((error) => {
          console.error('Ошибка входа:', error.message);
        });
    } else {
      console.log('Форма не валидна');
    }
  }
  
  
  

  goToRegister() {
    this.router.navigate(['/water-tracker/register']);
  }
}

