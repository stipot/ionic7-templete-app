import { Component, HostListener, OnInit } from '@angular/core';

interface CalculatorButton {
  label: string;
  action: string;
  color: string;
  value: string;
}

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalcComponent implements OnInit {
  expression: string = '';
  calculatorButtons: CalculatorButton[] = [];

  ngOnInit() {
    this.initializeCalculatorButtons();
  }

  private initializeCalculatorButtons() {
    this.calculatorButtons = [
      { label: 'C', action: 'clear', color: 'danger', value: 'clear' },
      { label: '( )', action: 'brackets', color: 'warning', value: 'brackets' },
      { label: '%', action: 'percentage', color: 'warning', value: 'percentage' },
      { label: '/', action: 'divide', color: 'warning', value: '/' },
      { label: '7', action: '7', color: 'light', value: '7' },
      { label: '8', action: '8', color: 'light', value: '8' },
      { label: '9', action: '9', color: 'light', value: '9' },
      { label: '*', action: 'multiply', color: 'warning', value: '*' },
      { label: '4', action: '4', color: 'light', value: '4' },
      { label: '5', action: '5', color: 'light', value: '5' },
      { label: '6', action: '6', color: 'light', value: '6' },
      { label: '-', action: 'subtract', color: 'warning', value: '-' },
      { label: '1', action: '1', color: 'light', value: '1' },
      { label: '2', action: '2', color: 'light', value: '2' },
      { label: '3', action: '3', color: 'light', value: '3' },
      { label: '+', action: 'add', color: 'warning', value: '+' },
      { label: '0', action: '0', color: 'light', value: '0' },
      { label: '.', action: 'decimal', color: 'medium', value: '.' },
      { label: '←', action: 'backspace', color: 'medium', value: 'backspace' },
      { label: '=', action: 'calculate', color: 'primary', value: 'calculate' }
    ];
  }

  handleButtonClick(button: CalculatorButton) {
    const value = button.value;

    if (this.expression === 'Ошибка') {
      this.expression = '';
    }

    switch (value) {
      case 'brackets':
        this.toggleBrackets();
        break;
      case 'clear':
        this.clear();
        break;
      case 'percentage':
        this.percentage();
        break;
      case 'backspace':
        this.backspace();
        break;
      case 'calculate':
        this.calculate();
        break;
      default:
        this.onButtonClick(value);
        break;
    }
  }

  onButtonClick(value: string) {
    this.expression += value;
  }

  toggleBrackets() {
    if (this.expression === '' || /[+\-*/(]$/.test(this.expression)) {
      this.expression += '(';
    } else {
      let balance = 0;
      for (let i = 0; i < this.expression.length; i++) {
        if (this.expression[i] === '(') balance++;
        if (this.expression[i] === ')') balance--;
      }
      
      if (balance > 0 && (/[0-9)]$/.test(this.expression))) {
        this.expression += ')';
      } else {
        if (/[0-9)]$/.test(this.expression)) {
          this.expression += '*(';
        } else {
          this.expression += '(';
        }
      }
    }
  }

  percentage() {
    try {
      if (this.expression.trim() === '') return;
      
      const numbers = this.expression.match(/(\d+(?:\.\d+)?)$/);
      if (numbers) {
        const lastNumber = parseFloat(numbers[0]);
        const percent = lastNumber / 100;
        this.expression = this.expression.slice(0, -numbers[0].length) + percent.toString();
      } else {
        let safeExpression = this.expression.replace(/×/g, '*');
        const result = eval(safeExpression) / 100;
        this.expression = result.toString();
      }
      
    } catch (e) {
      this.expression = 'Ошибка';
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    if (/^[0-9+\-*/.()%]$/.test(key)) {
      if (key === '%') {
        this.percentage();
      } else {
        this.onButtonClick(key);
      }
    }
    else if (key === 'Enter' || key === '=') {
      event.preventDefault(); 
      this.calculate();
    }
    else if (key === 'Backspace') {
      this.backspace();
    }
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
      this.clear();
    }
  }

  calculate() {
    try {
      if (this.expression.trim() === '') return;
      
      let balance = 0;
      for (let i = 0; i < this.expression.length; i++) {
        if (this.expression[i] === '(') balance++;
        if (this.expression[i] === ')') balance--;
      }
      
      let safeExpression = this.expression;
      
      for (let i = 0; i < balance; i++) {
        safeExpression += ')';
      }
      
      const result = eval(safeExpression);
      
      if (!isFinite(result) || isNaN(result)) {
        this.expression = 'Ошибка';
        return;
      }
      
      this.expression = result.toString();
      
    } catch (e) {
      this.expression = 'Ошибка';
    }
  }

  clear() {
    this.expression = '';
  }

  backspace() {
    this.expression = this.expression.slice(0, -1);
  }

  constructor() { }
}