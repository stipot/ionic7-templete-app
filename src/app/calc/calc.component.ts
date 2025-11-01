import { Component, HostListener  } from '@angular/core';
import { and, or } from 'firebase/firestore';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalcComponent {
  expression: string = '';
  buttons: string[] = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.','+'];

  onButtonClick(value: string) {
    this.expression += value;
  }

@HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    // Разрешённые символы
    if (/^[0-9+\-*/.]$/.test(key)) {
      this.expression += key;
    }
    else if ((key === 'Enter') || (key === '=')) {
      this.calculate();
    }
    else if (key === 'Backspace') {
      this.expression = this.expression.slice(0, -1);
    }
    else if ((key === 'Escape') || (key.toLowerCase() === 'c')) {
      this.clear();
    }
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
