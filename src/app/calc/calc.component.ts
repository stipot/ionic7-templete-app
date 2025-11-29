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
  
  inputValue: string = '';
  showCalculator: boolean = false;
  popupExpression: string = '';
  
  titleText: string = 'Калькулятор';
  basicText: string = 'Обычный';
  advancedText: string = 'Расширенный';
  formTitle: string = 'Форма с интеграцией калькулятора';
  formSubtitle: string = 'Используйте калькулятор для заполнения полей';
  amountLabel: string = 'Сумма';
  amountPlaceholder: string = 'Введите значение или используйте калькулятор';
  clearFormButton: string = 'Очистить форму';
  popupTitle: string = 'Калькулятор для формы';
  popupSubtitle: string = 'Вычислите значение и нажмите "Применить"';
  applyButton: string = 'Применить результат';
  closeButton: string = 'Закрыть';
  
  private langSub!: Subscription;

  constructor(private translate: TranslateService) {}

  async ngOnInit() {
    await this.loadTranslations();
    
    this.langSub = this.translate.onLangChange.subscribe(async () => {
      await this.loadTranslations();
    });
    
    this.initializeCalculatorButtons();
    this.initializeExtendedButtons();
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }

  private async loadTranslations() {
    this.titleText = await this.translate.get('CALCULATOR.TITLE').toPromise();
    this.basicText = await this.translate.get('CALCULATOR.BASIC').toPromise();
    this.advancedText = await this.translate.get('CALCULATOR.ADVANCED').toPromise();
    this.formTitle = await this.translate.get('FORM.TITLE').toPromise();
    this.formSubtitle = await this.translate.get('FORM.SUBTITLE').toPromise();
    this.amountLabel = await this.translate.get('FORM.AMOUNT_LABEL').toPromise();
    this.amountPlaceholder = await this.translate.get('FORM.AMOUNT_PLACEHOLDER').toPromise();
    this.clearFormButton = await this.translate.get('FORM.CLEAR_FORM_BUTTON').toPromise();
    this.popupTitle = await this.translate.get('POPUP.TITLE').toPromise();
    this.popupSubtitle = await this.translate.get('POPUP.SUBTITLE').toPromise();
    this.applyButton = await this.translate.get('POPUP.APPLY_BUTTON').toPromise();
    this.closeButton = await this.translate.get('POPUP.CLOSE_BUTTON').toPromise();
  }

  openCalculator() {
    this.showCalculator = true;
    // Если в поле уже есть значение, используем его как начальное выражение
    this.popupExpression = this.inputValue || '';
  }

  closeCalculator() {
    this.showCalculator = false;
  }

  applyCalculation() {
    if (this.popupExpression && this.popupExpression !== 'Ошибка') {
      // Применяем результат напрямую в поле ввода
      this.inputValue = this.popupExpression;
    }
    this.showCalculator = false;
  }

  clearForm() {
    this.inputValue = '';
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
      { label: 'C', action: 'clear', color: 'danger', value: 'clear' },
      { label: '( )', action: 'brackets', color: 'warning', value: 'brackets' },
      { label: '%', action: 'percentage', color: 'warning', value: 'percentage' },
      { label: '/', action: 'divide', color: 'warning', value: '/' },
      { label: 'log', action: 'log', color: 'tertiary', value: 'log' },
      { label: 'ln', action: 'ln', color: 'tertiary', value: 'ln' },
      { label: '√', action: 'sqrt', color: 'tertiary', value: 'sqrt' },
      { label: 'xʸ', action: 'power', color: 'tertiary', value: 'power' },
      { label: 'sin', action: 'sin', color: 'tertiary', value: 'sin' },
      { label: 'cos', action: 'cos', color: 'tertiary', value: 'cos' },
      { label: 'π', action: 'pi', color: 'tertiary', value: 'pi' },
      { label: 'e', action: 'e', color: 'tertiary', value: 'e' },
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

  toggleMode() {
    this.isExtendedMode = !this.isExtendedMode;
  }

  getCurrentButtons(): CalculatorButton[] {
    return this.isExtendedMode ? this.extendedButtons : this.calculatorButtons;
  }

  handleButtonClick(button: CalculatorButton) {
    this.handleCalculatorButton(button, 'main');
  }

  handlePopupButtonClick(button: CalculatorButton) {
    this.handleCalculatorButton(button, 'popup');
  }

  private handleCalculatorButton(button: CalculatorButton, type: 'main' | 'popup') {
    const value = button.value;
    const currentExpression = type === 'main' ? this.expression : this.popupExpression;
    const setExpression = (expr: string) => {
      if (type === 'main') {
        this.expression = expr;
      } else {
        this.popupExpression = expr;
      }
    };

    if (currentExpression === 'Ошибка') {
      setExpression('');
    }

    switch (value) {
      case 'brackets':
        setExpression(this.toggleBracketsLogic(currentExpression));
        break;
      case 'clear':
        setExpression('');
        break;
      case 'percentage':
        setExpression(this.percentageLogic(currentExpression));
        break;
      case 'backspace':
        setExpression(currentExpression.slice(0, -1));
        break;
      case 'calculate':
        setExpression(this.calculateLogic(currentExpression));
        break;
      case 'sqrt':
        setExpression(this.addFunctionLogic(currentExpression, 'sqrt('));
        break;
      case 'power':
        setExpression(currentExpression + '**');
        break;
      case 'sin':
        setExpression(this.addFunctionLogic(currentExpression, 'sin('));
        break;
      case 'cos':
        setExpression(this.addFunctionLogic(currentExpression, 'cos('));
        break;
      case 'pi':
        setExpression(currentExpression + Math.PI.toString());
        break;
      case 'log':
        setExpression(this.addFunctionLogic(currentExpression, 'log('));
        break;
      case 'ln':
        setExpression(this.addFunctionLogic(currentExpression, 'ln('));
        break;
      case 'e':
        setExpression(currentExpression + Math.E.toString());
        break;
      default:
        setExpression(currentExpression + value);
        break;
    }
  }

  private toggleBracketsLogic(expr: string): string {
    if (expr === '' || /[+\-*/(]$/.test(expr)) {
      return expr + '(';
    } else {
      let balance = 0;
      for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') balance++;
        if (expr[i] === ')') balance--;
      }
      
      if (balance > 0 && (/[0-9)]$/.test(expr))) {
        return expr + ')';
      } else {
        if (/[0-9)]$/.test(expr)) {
          return expr + '*(';
        } else {
          return expr + '(';
        }
      }
    }
  }

  private percentageLogic(expr: string): string {
    try {
      if (expr.trim() === '') return expr;
      
      const numbers = expr.match(/(\d+(?:\.\d+)?)$/);
      if (numbers) {
        const lastNumber = parseFloat(numbers[0]);
        const percent = lastNumber / 100;
        return expr.slice(0, -numbers[0].length) + percent.toString();
      } else {
        let safeExpression = expr.replace(/×/g, '*');
        const result = eval(safeExpression) / 100;
        return result.toString();
      }
    } catch (e) {
      return 'Ошибка';
    }
  }

  private addFunctionLogic(expr: string, funcName: string): string {
    if (expr === '' || /[+\-*/(^]$/.test(expr)) {
      return expr + funcName;
    } else if (/[\d).]$/.test(expr)) {
      return expr + '*' + funcName;
    } else {
      return expr + funcName;
    }
  }

  private calculateLogic(expr: string): string {
    try {
      if (expr.trim() === '') return expr;
      
      let safeExpression = expr
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
        return 'Ошибка';
      }
      
      return this.roundResult(result).toString();
    } catch (e) {
      return 'Ошибка';
    }
  }

  private roundResult(num: number): number {
    return Math.round(num * 10000000000) / 10000000000;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    if (key === '^') {
      event.preventDefault();
      if (this.showCalculator) {
        this.popupExpression += '**';
      } else {
        this.expression += '**';
      }
      return;
    }

    if (/^[0-9+\-*/.()%]$/.test(key)) {
      if (key === '%') {
        if (this.showCalculator) {
          this.popupExpression = this.percentageLogic(this.popupExpression);
        } else {
          this.expression = this.percentageLogic(this.expression);
        }
      } else {
        if (this.showCalculator) {
          this.popupExpression += key;
        } else {
          this.expression += key;
        }
      }
    }
    else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      if (this.showCalculator) {
        this.popupExpression = this.calculateLogic(this.popupExpression);
      } else {
        this.expression = this.calculateLogic(this.expression);
      }
    }
    else if (key === 'Backspace') {
      if (this.showCalculator) {
        this.popupExpression = this.popupExpression.slice(0, -1);
      } else {
        this.expression = this.expression.slice(0, -1);
      }
    }
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
      if (this.showCalculator) {
        this.popupExpression = '';
      } else {
        this.expression = '';
      }
    }
  }
}