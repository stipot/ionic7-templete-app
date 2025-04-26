import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService, LangChangeEvent  } from '@ngx-translate/core';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
})
export class TermsOfServiceComponent  implements OnInit {
  lang: string = "ru"
  constructor(private modalCtrl: ModalController, private translate: TranslateService) { }

  
  ngOnInit() {
    this.lang = this.translate.currentLang
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    })
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
 }

  handleChange(ev: any) {
    console.log('Current value:', JSON.stringify(ev.target.value));
 }
  
  change_lang(lang: string){
    this.translate.use(lang);
  }

}
