import { Component, OnInit } from '@angular/core';
import { ContactCard } from './contact-card.service/contact-card.model'
import { ContactCardService } from './contact-card.service/contact-card.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent  implements OnInit {
  contact: ContactCard = {}

  constructor(private data: ContactCardService, private translate: TranslateService) { }
  ngOnInit() {
  this.data.getData().subscribe((response) => {
    this.contact = response
  });
  }
}

