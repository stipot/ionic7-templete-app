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
  input_minutes_to_metro: number = 0;
  // количество комнат
  input_number_of_rooms: number = 1;
  // площадь
  input_area: number = 6;
  // жилая площадь
  input_living_area: number = 2;
  // площадь кухни
  input_kitchen_area: number = 1;
  // этаж
  input_floor: number = 1;
  // количество этажей
  input_number_of_floors: number = 1;
  // Новое здание или вторичка?
  apartment_type: string = "New_building"
  new_building: number = 0;
  secondary: number = 0;
  // Москва или Москвоский регион?
  region: string = "Moscow";
  moscow: number = 0;
  moscow_region: number = 0;
  // вид ремонта
  renovation: string = "Without";
  cosmetic: number = 0;
  designer: number = 0;
  european_style_renovation: number = 0;
  without: number = 0;
  // цена дома
  price: number = 0;
  result: string = "";
  format: number = 0;
  color: string = "";

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
    // выбор типа здания
    if (this.apartment_type == "New_building") {
      this.new_building = 1;
      this.secondary = 0;
    }
    if (this.apartment_type == "Secondary") {
      this.new_building = 0;
      this.secondary = 1;
    }
    // выбор региона
    if (this.region == "Moscow") {
      this.moscow = 1;
      this.moscow_region = 0;
    }
    if (this.region == "Region_Moscow") {
      this.moscow = 0;
      this.moscow_region = 1;
    }
    // выбор вида ремонта
    if (this.renovation == "Cosmetic") {
      this.cosmetic = 1;
      this.designer = 0;
      this.european_style_renovation = 0;
      this.without = 0;
    }
    if (this.renovation == "Designer") {
      this.cosmetic = 0;
      this.designer = 1;
      this.european_style_renovation = 0;
      this.without = 0;
    }
    if (this.renovation == "European_style_renovation") {
      this.cosmetic = 0;
      this.designer = 0;
      this.european_style_renovation = 1;
      this.without = 0;
    }
    if (this.renovation == "Without") {
      this.cosmetic = 0;
      this.designer = 0;
      this.european_style_renovation = 0;
      this.without = 1;
    }
    // Проверка площадей
    if (this.input_area < this.input_living_area + this.input_kitchen_area) {
      this.result = "Ошибка: общая площадь не может быть меньше чем: (жилая площадь + площадь кухни)!"
      this.color = "danger"
    }
    else {
      // Проверка этажей
      if (this.input_number_of_floors < this.input_floor) {
        this.result = "Ошибка: количество этажей в доме не может быть меньше, чем текущий этаж!"
        this.color = "danger"
      }
      else {
        this.price = this.input_minutes_to_metro * -471696 + this.input_number_of_rooms * -5924742 + this.input_area * 998989 + this.input_living_area * -23873 + this.input_kitchen_area * 117384 + this.input_floor * -104030 + this.input_number_of_floors * -550146 + this.new_building * -5628515 + this.secondary * 5628515 + this.moscow * -117278 + this.moscow_region * 117278 + this.cosmetic * -5285216 + this.designer * 17698454 + this.european_style_renovation * -8660693 + this.without * -3752544 - 6857993
        // Проверка, что цена больше 0
        if (this.price <= 0) {
          this.result = "Не удалось посчитать, попробуйте другие параметры"
          this.color = "danger"
        }
        else {
          this.format = this.price
          const formattedPrice = this.format.toLocaleString('ru-RU'); // "66 424 608"
          const result = `${formattedPrice.replace(/\s/g, "'")} руб`;
          this.result = String(result)
          this.color = "primary"
        }
      }
    }
  }
}