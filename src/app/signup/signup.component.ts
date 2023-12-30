import { Component, OnInit,} from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  validation_messages = {
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

  appTitle = "Ionic 7 Template App"
  constructor (public modalController: ModalController){}
  ngOnInit() { }

  async show() {
      const modal = await this.modalController.create({
      component: PrivacyPolicyComponent
    });
    modal.present(); 
    const {data, role} = await modal.onWillDismiss(); 
  }
}