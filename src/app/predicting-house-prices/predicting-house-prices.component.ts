import { Component, OnInit } from '@angular/core';
import { DataService } from "./data.service";
import { or } from 'firebase/firestore';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-predicting-house-prices',
  templateUrl: './predicting-house-prices.component.html',
  styleUrls: ['./predicting-house-prices.component.scss'],
  standalone: false,
})
export class PredictingHousePricesComponent{
  // минут до метро
  input_minutes_to_metro: string = "";
  minutes_to_metro: number = 0;
  // количество комнат
  input_number_of_rooms: string = "";
  // площадь
  input_area: string = "";
  area: number = 0;
  // Москва или Москвоский регион?
  region: string = "";
  moscow: number = 0;
  moscow_region: number = 0;

  price: number = 0;
  result: string = "";
  format: number = 0;

  error: boolean = false;

  color: string = "";
  rangeValue = "";

  constructor(private translate: TranslateService) {
  }

  myname: string = "Посчитать стоимость дома"

  // Проверка что строка может быть числом
  isNumericString(str: string): boolean 
  {
    return !isNaN(parseFloat(str)) && isFinite(Number(str));
  }

  go() 
  {
    this.error = false
    if (this.isNumericString(this.input_minutes_to_metro)) {this.minutes_to_metro = Number(this.input_minutes_to_metro)}
    else 
      {
        this.result = "ERROR: Неверное значение минут до метро!" 
        this.color = "danger"
        return
      }

    if (this.isNumericString(this.input_area)) {this.area = Number(this.input_area)}
    else 
      {
        this.result = "ERROR: Неверное значение площади!" 
        this.color = "danger"
        return
      }

    if (this.region == "Moscow") {this.moscow = 1}
    else {this.moscow = 0}

    if (this.region == "Region_Moscow") {this.moscow_region = 1}
    else {this.moscow_region = 0}
    
    if (this.region == "") 
      {
        this.result = "ERROR: Укажите регион!" 
        this.color = "danger"
        return
      }


    this.price = -511916 * this.minutes_to_metro + 949512 * this.area + 4697348 * this.moscow + -4697348 * this.moscow_region - 28104780 
    if (this.price < 0) 
      {
        this.result = "ERROR: вышло отрицательное значение, попробуйте другие параметры"
        this.color = "danger"
      }
    else 
      {
        this.format = this.price
        const formattedPrice = this.format.toLocaleString('ru-RU'); // "66 424 608"
        const result = `${formattedPrice.replace(/\s/g, "'")} руб`;
        this.result = String(result)
        this.color = "primary"
      }

        // this.myname = this.region
  }
}