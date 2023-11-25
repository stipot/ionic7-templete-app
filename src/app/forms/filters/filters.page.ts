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

  

  constructor() {
    this.rangeForm = new FormGroup({
      single: new FormControl(2),
      dual: new FormControl({lower: 5000, upper:  10000})
    });
    console.log(this.rangeForm)
    this.checkboxForm = new FormGroup({
      filter_1: new FormControl(true),
      filter_2: new FormControl(false),
      filter_3: new FormControl(false),
    });
    }

  rangeChange(range: Range) {
    console.log('range change', range);
  }
}
