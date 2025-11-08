import { Component, HostListener, OnInit } from '@angular/core';

interface CalculatorButton {
  label: string;
  action: string;
  color: string;
  handler: () => void;
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
      { label: 'C', action: 'clear', color: 'danger', handler: () => this.clear() },
      { label: '( )', action: 'brackets', color: 'warning', handler: () => this.toggleBrackets() },
      { label: '%', action: 'percentage', color: 'warning', handler: () => this.percentage() },
      { label: '/', action: 'divide', color: 'warning', handler: () => this.onButtonClick('/') },
      { label: '7', action: '7', color: 'light', handler: () => this.onButtonClick('7') },
      { label: '8', action: '8', color: 'light', handler: () => this.onButtonClick('8') },
      { label: '9', action: '9', color: 'light', handler: () => this.onButtonClick('9') },
      { label: '*', action: 'multiply', color: 'warning', handler: () => this.onButtonClick('*') },
      { label: '4', action: '4', color: 'light', handler: () => this.onButtonClick('4') },
      { label: '5', action: '5', color: 'light', handler: () => this.onButtonClick('5') },
      { label: '6', action: '6', color: 'light', handler: () => this.onButtonClick('6') },
      { label: '-', action: 'subtract', color: 'warning', handler: () => this.onButtonClick('-') },
      { label: '1', action: '1', color: 'light', handler: () => this.onButtonClick('1') },
      { label: '2', action: '2', color: 'light', handler: () => this.onButtonClick('2') },
      { label: '3', action: '3', color: 'light', handler: () => this.onButtonClick('3') },
      { label: '+', action: 'add', color: 'warning', handler: () => this.onButtonClick('+') },
      { label: '0', action: '0', color: 'light', handler: () => this.onButtonClick('0') },
      { label: '.', action: 'decimal', color: 'medium', handler: () => this.onButtonClick('.') },
      { label: '←', action: 'backspace', color: 'medium', handler: () => this.backspace() },
      { label: '=', action: 'calculate', color: 'primary', handler: () => this.calculate() }
    ];
  }

  onButtonClick(value: string) {
    if (this.expression === 'Ошибка') {
      this.expression = '';
    }
    this.expression += value;
  }

  toggleBrackets() {
    if (this.expression === 'Ошибка') {
      this.expression = '';
    }
    
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

    if (/^[0-9+\-*/.()]$/.test(key)) {
      this.onButtonClick(key);
    }
    else if (key === 'Enter' || key === '=') {
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