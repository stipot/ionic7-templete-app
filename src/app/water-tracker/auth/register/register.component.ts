import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { waterTrackerApp } from '../../firebase-config-water-tracker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  register() {
    const auth = getAuth(waterTrackerApp);
    const db = getFirestore(waterTrackerApp);

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Регистрация успешна');
        
        const userId = userCredential.user.uid;
        setDoc(doc(db, 'users', userId), {
          email: this.email,
          waterConsumption: []
        });

        this.router.navigate(['/water-tracker/login']);
      })
      .catch((error) => {
        console.error('Ошибка регистрации:', error.message);
      });
  }

  goToLogin() {
    this.router.navigate(['/water-tracker/login']);
  }
}
