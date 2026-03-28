import { Component, OnInit } from '@angular/core';
import { DataService } from "./data.service";

@Component({
  selector: 'app-predicting-house-prices',
  templateUrl: './predicting-house-prices.component.html',
  styleUrls: ['./predicting-house-prices.component.scss'],
  standalone: false,
})
export class PredictingHousePricesComponent  implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {}

  myname: string = "Tim"
  go(){
    console.log(this.data.getData())
  }

}
