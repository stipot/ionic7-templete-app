import { Component, OnInit } from '@angular/core';
import { DataService, Product } from './data.service';
import { RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
})
export class DealsComponent  implements OnInit {

  constructor(private data: DataService) { }
  product?: Product
  refresh(ev: any) {
    setTimeout(() => {
     (ev as RefresherCustomEvent).detail.complete(); 
    },3000); 
  } 

  ngOnInit(){}
  getProiducts(): Product[] {
    return this.data.getProducts()  


  }

}
