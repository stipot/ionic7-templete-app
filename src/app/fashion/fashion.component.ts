import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FashionService } from './fashion.service';

@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.scss'],
})
export class FashionComponent  implements OnInit {
  products: any = []

  constructor(public FashionService: FashionService) {
    console.log(`type = ${typeof this.FashionService.getData()}`);
    this.FashionService.getData().subscribe((res: any) => {
      this.products = res
    })
  }

  
  ngOnInit(){}

  @ViewChild(IonModal) modal!: IonModal;

  // message = '';
  name?: string;

  open() {
    this.modal.dismiss(null, 'cancel');
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }

}
