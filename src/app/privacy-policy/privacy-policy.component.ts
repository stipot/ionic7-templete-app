import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  dismiss(){
    return this.modalCtrl.dismiss();
  }

}
