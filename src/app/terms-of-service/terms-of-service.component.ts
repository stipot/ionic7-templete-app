import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
})
export class TermsOfServiceComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  
  ngOnInit() {}

  dismiss(): void {
    this.modalCtrl.dismiss();
 }
}
