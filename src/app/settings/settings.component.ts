import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {

  constructor(private translate: TranslateService) { }
  selectedtheme:string = '';
  language:string = '';
  font:string = '';

  ngOnInit() {
    this.language = this.translate.currentLang
  }

  changeLanguage() {
    this.translate.use(this.language);
    if (this.selectedtheme == 'dark'){
      document.body.classList.add('dark');
      document.body.classList.remove('light')
    } else{
      document.body.classList.add('light');
      document.body.classList.remove('dark')
    }
    console.log(document.body.classList)
  }

  appPages = [
    { lang:'Русский', langname:'ru' },
    { lang:'English', langname:'en' },
  ]
}
