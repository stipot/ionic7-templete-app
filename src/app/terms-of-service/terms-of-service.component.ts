import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
})
export class TermsOfServiceComponent  implements OnInit {
  lang: string = "ru"
  constructor(private modalCtrl: ModalController) { }

  
  ngOnInit() {}

  dismiss(): void {
    this.modalCtrl.dismiss();
 }

 handleChange(ev: any) {
    console.log('Current value:', JSON.stringify(ev.target.value));
 }

}
