import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, MenuController } from '@ionic/angular';
import { Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public modalController: ModalController

  ) { 


  }

  ngOnInit() {
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyComponent
    });
    return await modal.present();
  }
}
