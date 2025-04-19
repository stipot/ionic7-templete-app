import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';  // Импорт FormBuilder
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirestoreService } from '../user/firestore.service';
import { ModalController } from '@ionic/angular';
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
    private firestore: FirestoreService,
    private fb: FormBuilder  // Внедряем FormBuilder
  ) {
    // Создаем форму с помощью FormBuilder
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

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log(email, password, "email", "password")
      const db = this.firestore.userData;
      console.log("db",db) 
      
      const auth = getAuth(db);
      console.log(auth)

      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          console.log(userCredential, "userCredential")
          const userId = userCredential.user.uid;
          console.log(userId, "userId")
          const user_docs = await this.firestore.getAllData("profiles", userId);
          console.log(user_docs, "user_docs")
          const userExists = await this.firestore.checkUserExists(userId);
          if (userExists) {
            this.router.navigate(['/rss-data'], { replaceUrl: true });
          } else {
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


