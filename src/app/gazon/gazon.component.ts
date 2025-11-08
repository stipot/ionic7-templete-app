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
  downloadUrl: string = '';
  isLoading: boolean = false;

  // поддерживаемые форматы для конвертации
  readonly supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'];

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.calculateFileSize(this.selectedFile.size);
      this.detectSourceFormat(this.selectedFile);
      this.conversionResult = null;
      this.downloadUrl = '';
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

  detectSourceFormat(file: File): void {
    // Сначала пробуем определить по расширению файла
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    // Если есть расширение и оно поддерживается - используем его
    if (extension && this.supportedFormats.includes(extension)) {
      this.sourceFormat = extension;
      return;
    }

    // Если расширение неопределено или не поддерживается, пробуем определить по MIME type
    if (file.type) {
      const mimeFormat = this.getFormatFromMimeType(file.type);
      if (mimeFormat) {
        this.sourceFormat = mimeFormat;
        return;
      }
    }

    // Если не удалось определить - оставляем пустым
    this.sourceFormat = '';
  }

  // Определение формата по MIME type
  private getFormatFromMimeType(mimeType: string): string | null {
    const mimeToFormat: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
      'image/bmp': 'bmp',
      'image/x-icon': 'ico',
      'image/tiff': 'tiff',
      'image/svg+xml': 'svg',
      'image/avif': 'avif',
      'image/heic': 'heic',
      'image/heif': 'heic'
    };

    return mimeToFormat[mimeType] || null;
  }

  clearFile(): void {
    this.selectedFile = null;
    this.fileSize = '';
    this.sourceFormat = '';
    this.targetFormat = '';
    this.conversionResult = null;
    this.downloadUrl = '';
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  async convertFile(): Promise<void> {
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

    // проверка что формат поддерживается для конвертации
    if (!this.isFormatSupported(this.sourceFormat) || !this.isFormatSupported(this.targetFormat)) {
      this.conversionResult = {
        success: false,
        message: `Конвертация из ${this.sourceFormat.toUpperCase()} в ${this.targetFormat.toUpperCase()} пока не поддерживается`
      };
      return;
    }

    this.isLoading = true;
    this.conversionResult = null;

    try {
      // конвертируем изображение
      const convertedBlob = await this.convertImage(this.selectedFile, this.targetFormat);
      
      // создаем URL для скачивания
      this.downloadUrl = URL.createObjectURL(convertedBlob);
      
      this.conversionResult = {
        success: true,
        message: `Файл "${this.selectedFile.name}" успешно сконвертирован из ${this.sourceFormat.toUpperCase()} в ${this.targetFormat.toUpperCase()}!`
      };
      
    } catch (error) {
      console.error('Ошибка конвертации:', error);
      this.conversionResult = {
        success: false,
        message: 'Ошибка при конвертации файла. Убедитесь, что файл является изображением.'
      };
    } finally {
      this.isLoading = false;
    }
  }

  // проверка поддерживается ли формат для конвертации
  private isFormatSupported(format: string): boolean {
    return this.supportedFormats.includes(format.toLowerCase());
  }

  // основная функция конвертации изображений
  private convertImage(file: File, targetFormat: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas не поддерживается в этом браузере'));
        return;
      }

      const img = new Image();

      img.onload = () => {
        // устанавливаем размеры canvas по размерам изображения
        canvas.width = img.width;
        canvas.height = img.height;

        // очищаем canvas и рисуем изображение
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // настройки для разных форматов
        let mimeType: string;
        let quality: number;

        switch (targetFormat.toLowerCase()) {
          case 'jpg':
          case 'jpeg':
            mimeType = 'image/jpeg';
            quality = 0.85;
            break;
          case 'png':
            mimeType = 'image/png';
            quality = 0.9;
            break;
          case 'webp':
            mimeType = 'image/webp';
            quality = 0.8;
            break;
          case 'gif':
            mimeType = 'image/gif';
            quality = 1.0;
            break;
          case 'bmp':
            mimeType = 'image/bmp';
            quality = 1.0;
            break;
          default:
            mimeType = 'image/png';
            quality = 0.9;
        }

        // конвертируем canvas в blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Не удалось сконвертировать изображение'));
          }
        }, mimeType, quality);
      };

      img.onerror = () => {
        reject(new Error('Не удалось загрузить изображение'));
      };

      // загружаем изображение
      img.src = URL.createObjectURL(file);
    });
  }

  // скачивание сконвертированного файла
  downloadConvertedFile(): void {
    if (this.downloadUrl && this.selectedFile) {
      const originalName = this.selectedFile.name.split('.')[0];
      const filename = `${originalName}_converted.${this.targetFormat}`;
      
      const link = document.createElement('a');
      link.href = this.downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}