import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  lang: string = "ru"
  langs: string[]=[];
  isModal:boolean = false
  constructor(private modalCtrl: ModalController, private translate: TranslateService) { }

  ngOnInit() {
    this.lang = this.translate.currentLang
    this.langs = this.translate.getLangs()
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

