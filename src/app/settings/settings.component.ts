import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {

  constructor(private translate: TranslateService) { }
  selectedtheme:string = 'Dark';
  language:string = '';
  font:string = '';

  ngOnInit() {}

  changeLanguage() {
    this.translate.use(this.language);
  }
}

