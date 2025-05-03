import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, MenuController } from '@ionic/angular';
import { Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {FirestoreService} from "../user/firestore.service"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  pageTitle = "Sign up"
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;
  email: string = ""
  password: string = '';

  register() {
    this.email = this.signupForm.get('email')?.value;
    this.password = this.signupForm.get('matching_passwords.password')?.value;
    const auth = getAuth(this.firestore.userData);
    const db = getFirestore(this.firestore.userData);

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Регистрация успешна');
        
        const userId = userCredential.user.uid;
        setDoc(doc(db, 'users', userId), {
          email: this.email,
          waterConsumption: []
        });

        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Ошибка регистрации:', error.message);
      });
  }

  goToLogin() {
    this.router.navigate(['/water-tracker/login']);
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ]
  }
  


  constructor(
    public modalController: ModalController,
    private router: Router,
    private firestore: FirestoreService
  ) { 

    this.matching_passwords_group = new FormGroup({
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      'confirm_password': new FormControl('', Validators.required)
    }, (formGroup: AbstractControl) =>  {
      return SignupComponent.areNotEqual(formGroup);
    });

    this.signupForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'matching_passwords': this.matching_passwords_group
    });

  }
  appTitle = "Ionic 7 Template App"
  ngOnInit() {}

  static areNotEqual(formGroup: any) {
    let val;
    let valid = true;

    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];

        if (val === undefined) {
          val = control.value;
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areNotEqual: true
    };
  }

  async showModal(component: any) {
    const modal = await this.modalController.create({ component:component, componentProps:{isModal: true}});
    return await modal.present();
  }

  async showTermsOfServiceModal() {
    return this.showModal(TermsOfServiceComponent);
  }

  async showPrivacyModal() {
    return this.showModal(PrivacyPolicyComponent);
  }

}
