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
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const db = this.firestore.userData; // Если FirestoreService предоставляет userData
  
      const auth = getAuth(db);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Вход выполнен');
          this.router.navigate(['/water-tracker/tabs/main'], { replaceUrl: true });
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

