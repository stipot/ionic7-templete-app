import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalcComponent  implements OnInit {
  expression: string = '';
  buttons: string[] = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.','+'];

  onButtonClick(value: string) {
    this.expression += value;
  }

  calculate() {
    try {
      this.expression = eval(this.expression).toString();
    } catch (e) {
      this.expression = 'Ошибка';
    }
  }
  clear() {
    this.expression = '';
  }
  constructor() { }

  ngOnInit() {}

}
