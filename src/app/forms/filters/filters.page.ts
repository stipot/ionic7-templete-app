import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage {
  rangeForm: FormGroup;
  counterForm: any;
  checkboxForm: FormGroup;
  toggled:Boolean;
  radioForm: FormGroup;
  typeOfRooms = [{ title_field: "Стандартный", value_fieled: "347" }, { title_field: "Люкс", value_fieled: "403" }, { title_field: "Полу-люкс", value_fieled: "555" }];
  typeOfRequirs = ["Уборка номеров", "Всё включено", "Обслуживание номеров"]
  facilities = ["Парковка", "Бесплатный WI-FI","Можно с животными","Трансфер от аэропорта"]
  constructor() {
    this.rangeForm = new FormGroup({
      single: new FormControl(2),
      dual: new FormControl({ lower: 5000, upper: 10000 })
    });
    console.log(this.rangeForm)
    this.checkboxForm = new FormGroup({
      filter_1: new FormControl(true),
      filter_2: new FormControl(false),
      filter_3: new FormControl(false),
    });
    this.radioForm = new FormGroup({
      selected_option: new FormControl(this.typeOfRooms[0])
    });
    this.toggled = false

 
  }

  rangeChange(range: Range) {
    console.log('range change', range);
  }
 
}
