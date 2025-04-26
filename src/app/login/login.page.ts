import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirestoreService } from '../user/firestore.service';
import { ModalController } from '@ionic/angular';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { doc, getDoc, setDoc } from "firebase/firestore";

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
    private firestore: FirestoreService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {}

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

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      const auth = getAuth(this.firestore.userData);
      const db = this.firestore.UserDB;
  
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
  
        const userProfileRef = doc(db, 'profiles', userId);
        const userProfileSnap = await getDoc(userProfileRef);
  
        if (!userProfileSnap.exists()) {
          const initialProfileData = {
            email: email,
            createdAt: new Date().toISOString(),
          };
          await setDoc(userProfileRef, initialProfileData);
          console.log('Профиль пользователя создан');
        } else {
          console.log('Профиль пользователя существует');
        }
  
        this.router.navigate(['/rss-data'], { replaceUrl: true });
  
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Ошибка входа:', error.message);
        } else {
          console.error('Неизвестная ошибка входа:', error);
        }
      }
    } else {
      console.log('Форма не валидна');
    }
  }
  

  goToRegister() {
    this.router.navigate(['/water-tracker/register']);
  }
}



