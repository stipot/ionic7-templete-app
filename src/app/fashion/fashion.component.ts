import { Component, OnInit } from '@angular/core';
// import { Dress } from './fashion.model';
import { FashionService } from './fashion.service';

@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.scss'],
})
export class FashionComponent  implements OnInit {
  products: any = []

  constructor(public FashionService: FashionService) {
    this.FashionService.getData().subscribe((res: any) => {
      this.products = res
    })
  }

  
  ngOnInit(){}

}
