import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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
export class CalcComponent implements OnInit, OnDestroy {
  expression: string = '';
  calculatorButtons: CalculatorButton[] = [];
  isExtendedMode: boolean = false;
  extendedButtons: CalculatorButton[] = [];
  
  private langSub!: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.langSub = this.translate.onLangChange.subscribe(() => {
    });
    
    this.initializeCalculatorButtons();
    this.initializeExtendedButtons();
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
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

  private initializeExtendedButtons() {
    this.extendedButtons = [
      // Ряд 1 - базовые операции
      { label: 'C', action: 'clear', color: 'danger', value: 'clear' },
      { label: '( )', action: 'brackets', color: 'warning', value: 'brackets' },
      { label: '%', action: 'percentage', color: 'warning', value: 'percentage' },
      { label: '/', action: 'divide', color: 'warning', value: '/' },
      
      // Ряд 2 - научные функции 1
      { label: 'log', action: 'log', color: 'tertiary', value: 'log' },
      { label: 'ln', action: 'ln', color: 'tertiary', value: 'ln' },
      { label: '√', action: 'sqrt', color: 'tertiary', value: 'sqrt' },
      { label: 'xʸ', action: 'power', color: 'tertiary', value: 'power' },
      
      // Ряд 3 - научные функции 2
      { label: 'sin', action: 'sin', color: 'tertiary', value: 'sin' },
      { label: 'cos', action: 'cos', color: 'tertiary', value: 'cos' },
      { label: 'π', action: 'pi', color: 'tertiary', value: 'pi' },
      { label: 'e', action: 'e', color: 'tertiary', value: 'e' },

      // Ряд 4 - цифры 7-9 и умножение
      { label: '7', action: '7', color: 'light', value: '7' },
      { label: '8', action: '8', color: 'light', value: '8' },
      { label: '9', action: '9', color: 'light', value: '9' },
      { label: '*', action: 'multiply', color: 'warning', value: '*' },
      
      // Ряд 5 - цифры 4-6 и вычитание
      { label: '4', action: '4', color: 'light', value: '4' },
      { label: '5', action: '5', color: 'light', value: '5' },
      { label: '6', action: '6', color: 'light', value: '6' },
      { label: '-', action: 'subtract', color: 'warning', value: '-' },
      
      // Ряд 6 - цифры 1-3 и сложение
      { label: '1', action: '1', color: 'light', value: '1' },
      { label: '2', action: '2', color: 'light', value: '2' },
      { label: '3', action: '3', color: 'light', value: '3' },
      { label: '+', action: 'add', color: 'warning', value: '+' },
      
      // Ряд 7 - ноль, точка, backspace, равно
      { label: '0', action: '0', color: 'light', value: '0' },
      { label: '.', action: 'decimal', color: 'medium', value: '.' },
      { label: '←', action: 'backspace', color: 'medium', value: 'backspace' },
      { label: '=', action: 'calculate', color: 'primary', value: 'calculate' }
    ];
  }

  toggleMode() {
    this.isExtendedMode = !this.isExtendedMode;
  }

  getCurrentButtons(): CalculatorButton[] {
    return this.isExtendedMode ? this.extendedButtons : this.calculatorButtons;
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
      case 'sqrt':
        this.addFunction('sqrt(');
        break;
      case 'power':
        this.onButtonClick('**');
        break;
      case 'sin':
        this.addFunction('sin(');
        break;
      case 'cos':
        this.addFunction('cos(');
        break;
      case 'pi':
        this.onButtonClick(Math.PI.toString());
        break;
      case 'log':
        this.addFunction('log(');
        break;
      case 'ln':
        this.addFunction('ln(');
        break;
      case 'e':
        this.onButtonClick(Math.E.toString());
        break;
      default:
        this.onButtonClick(value);
        break;
    }
  }

  onButtonClick(value: string) {
    this.expression += value;
  }

  addFunction(funcName: string) {
    if (this.expression === '' || /[+\-*/(^]$/.test(this.expression)) {
      this.expression += funcName;
    } else if (/[\d).]$/.test(this.expression)) {
      this.expression += '*' + funcName;
    } else {
      this.expression += funcName;
    }
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

    if (key === '^') {
      event.preventDefault();
      this.onButtonClick('**');
      return;
    }

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
      
      let safeExpression = this.expression
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString());
      
      let balance = 0;
      for (let i = 0; i < safeExpression.length; i++) {
        if (safeExpression[i] === '(') balance++;
        if (safeExpression[i] === ')') balance--;
      }
      
      for (let i = 0; i < balance; i++) {
        safeExpression += ')';
      }
      
      const result = new Function('return ' + safeExpression)();
      
      if (!isFinite(result) || isNaN(result)) {
        this.expression = 'Ошибка';
        return;
      }
      
      this.expression = this.roundResult(result).toString();
      
    } catch (e) {
      this.expression = 'Ошибка';
    }
  }

  private roundResult(num: number): number {
    return Math.round(num * 10000000000) / 10000000000;
  }

  clear() {
    this.expression = '';
  }

  backspace() {
    this.expression = this.expression.slice(0, -1);
  }
}