import { Component } from '@angular/core';

@Component({
  selector: 'app-gazon',
  templateUrl: './gazon.component.html'
})
export class GazonComponent {
  selectedFile: File | null = null;
  sourceFormat: string = '';
  targetFormat: string = '';
  fileSize: string = '';
  conversionResult: { success: boolean; message: string } | null = null;

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.calculateFileSize(this.selectedFile.size);
      this.detectSourceFormat(this.selectedFile.name);
      this.conversionResult = null; // сбрасываем предыдущий результат
    }
  }

  calculateFileSize(size: number): void {
    if (size === 0) {
      this.fileSize = '0 Б';
      return;
    }

    const k = 1024;
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    
    this.fileSize = parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  detectSourceFormat(filename: string): void {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (extension) {
      this.sourceFormat = extension;
    }
  }

  clearFile(): void {
    this.selectedFile = null;
    this.fileSize = '';
    this.sourceFormat = '';
    this.targetFormat = '';
    this.conversionResult = null;
    
    // сброс fileinput
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  convertFile(): void {
    if (!this.selectedFile || !this.sourceFormat || !this.targetFormat) {
      this.conversionResult = {
        success: false,
        message: 'Ошибка: заполните все поля'
      };
      return;
    }

    // проверка на одинаковые форматы
    if (this.sourceFormat === this.targetFormat) {
      this.conversionResult = {
        success: false,
        message: 'Ошибка: исходный и целевой форматы не могут быть одинаковыми'
      };
      return;
    }

    console.log('Конвертация файла:', {
      file: this.selectedFile.name,
      size: this.fileSize,
      from: this.sourceFormat,
      to: this.targetFormat
    });

    // имитация конвертации (чисто заглушка)
    this.conversionResult = {
      success: true,
      message: `Файл "${this.selectedFile.name}" успешно сконвертирован из ${this.sourceFormat.toUpperCase()} в ${this.targetFormat.toUpperCase()}!`
    };
  }
}