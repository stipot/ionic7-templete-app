import { Component } from '@angular/core';

@Component({
  selector: 'app-gazon',
  templateUrl: './gazon.component.html',
  styleUrls: ['./gazon.component.scss']
})
export class GazonComponent {
  selectedFile: File | null = null;
  sourceFormat: string = '';
  targetFormat: string = '';
  fileSize: string = '';
  conversionResult: { success: boolean; message: string } | null = null;
  downloadUrl: string = '';
  isLoading: boolean = false;
  isDragOver: boolean = false;

  // поддерживаемые форматы для конвертации
  readonly supportedFormats = [
    'jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 
    'ico', 'tiff', 'svg', 'avif', 'heic', 'pdf', 
    'doc', 'docx', 'txt', 'rtf'
  ];

  // обработчик выбора файла
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.processFile(target.files[0]);
    }
  }

  // обработчик drag and drop
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  // обработчик перетаскивания над областью
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  // обработчик выхода из области перетаскивания
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  // обработка выбранного файла
  private processFile(file: File): void {
    this.selectedFile = file;
    this.calculateFileSize(file.size);
    this.detectSourceFormat(file);
    this.conversionResult = null;
    this.downloadUrl = '';
  }

  // расчет размера файла в читаемом формате
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

  // получение иконки для типа файла
  getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) {
      return 'image-outline';
    } else if (mimeType.includes('pdf')) {
      return 'document-outline';
    } else if (mimeType.includes('word') || mimeType.includes('document')) {
      return 'document-outline';
    } else if (mimeType.includes('text')) {
      return 'document-text-outline';
    }
    return 'document-outline';
  }

  // определение исходного формата файла
  detectSourceFormat(file: File): void {
    // сначала пробуем определить по расширению файла
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (extension && this.supportedFormats.includes(extension)) {
      this.sourceFormat = extension;
      return;
    }

    // если расширение неопределено, пробуем определить по MIME type
    if (file.type) {
      const mimeFormat = this.getFormatFromMimeType(file.type);
      if (mimeFormat) {
        this.sourceFormat = mimeFormat;
        return;
      }
    }

    // если не удалось определить - оставляем пустым
    this.sourceFormat = '';
  }

  // определение формата по MIME type
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
      'image/heif': 'heic',
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'text/plain': 'txt',
      'application/rtf': 'rtf',
      'text/rtf': 'rtf'
    };

    return mimeToFormat[mimeType] || null;
  }

  // очистка выбранного файла
  clearFile(): void {
    this.selectedFile = null;
    this.fileSize = '';
    this.sourceFormat = '';
    this.targetFormat = '';
    this.conversionResult = null;
    this.downloadUrl = '';
    this.isDragOver = false;
    
    // сброс значения input file
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // основная функция конвертации
  async convertFile(): Promise<void> {
    if (!this.selectedFile || !this.sourceFormat || !this.targetFormat) {
      this.showError('Ошибка: заполните все поля');
      return;
    }

    // проверка на одинаковые форматы
    if (this.sourceFormat === this.targetFormat) {
      this.showError('Ошибка: исходный и целевой форматы не могут быть одинаковыми');
      return;
    }

    this.isLoading = true;
    this.conversionResult = null;

    try {
      let convertedBlob: Blob;

      // выбор метода конвертации в зависимости от типа файла
      if (this.isImageFile(this.sourceFormat)) {
        convertedBlob = await this.convertImage(this.selectedFile, this.targetFormat);
      } else if (this.isTextFile(this.sourceFormat)) {
        convertedBlob = await this.convertText(this.selectedFile, this.targetFormat);
      } else {
        throw new Error(`Конвертация из ${this.sourceFormat} в ${this.targetFormat} пока не поддерживается (либо не будет поддерживаться)`);
      }

      // создаем URL для скачивания
      this.downloadUrl = URL.createObjectURL(convertedBlob);
      
      this.conversionResult = {
        success: true,
        message: `Файл "${this.selectedFile.name}" успешно сконвертирован из ${this.sourceFormat.toUpperCase()} в ${this.targetFormat.toUpperCase()}!`
      };
      
    } catch (error) {
      console.error('Ошибка конвертации:', error);
      this.showError('Ошибка при конвертации файла. Убедитесь, что файл корректен.');
    } finally {
      this.isLoading = false;
    }
  }

  // проверка является ли файл изображением
  private isImageFile(format: string): boolean {
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'ico', 'tiff', 'svg', 'avif', 'heic'];
    return imageFormats.includes(format.toLowerCase());
  }

  // проверка является ли файл текстовым
  private isTextFile(format: string): boolean {
    const textFormats = ['txt', 'pdf', 'doc', 'docx', 'rtf'];
    return textFormats.includes(format.toLowerCase());
  }

  // конвертация изображений
  private convertImage(file: File, targetFormat: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      // для SVG используем текстовую конвертацию
      if (targetFormat.toLowerCase() === 'svg') {
        this.convertToSvg(file).then(resolve).catch(reject);
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas не поддерживается в этом браузере'));
        return;
      }

      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // для прозрачных форматов заливаем белым фоном
        if (['jpg', 'jpeg'].includes(targetFormat.toLowerCase())) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(img, 0, 0);

        // настройки для разных форматов
        const formatSettings = this.getImageFormatSettings(targetFormat);
        
        // конвертируем canvas в blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Не удалось сконвертировать изображение'));
          }
        }, formatSettings.mimeType, formatSettings.quality);
      };

      img.onerror = () => {
        reject(new Error('Не удалось загрузить изображение'));
      };

      img.src = URL.createObjectURL(file);
    });
  }

  // конвертация в SVG (упрощенная)
  private async convertToSvg(file: File): Promise<Blob> {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        const svgContent = `
          <svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
            <image href="${URL.createObjectURL(file)}" width="${img.width}" height="${img.height}"/>
          </svg>
        `;
        resolve(new Blob([svgContent], { type: 'image/svg+xml' }));
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // конвертация текстовых файлов
  private async convertText(file: File, targetFormat: string): Promise<Blob> {
    const text = await file.text();
    
    // на будущее: можно добавить логику преобразования между текстовыми форматами
    return new Blob([text], { 
      type: this.getMimeTypeFromFormat(targetFormat) 
    });
  }

  // получение настроек для формата изображения
  private getImageFormatSettings(format: string): { mimeType: string; quality: number } {
    const settings: { [key: string]: { mimeType: string; quality: number } } = {
      'jpg': { mimeType: 'image/jpeg', quality: 0.85 },
      'jpeg': { mimeType: 'image/jpeg', quality: 0.85 },
      'png': { mimeType: 'image/png', quality: 0.9 },
      'webp': { mimeType: 'image/webp', quality: 0.8 },
      'gif': { mimeType: 'image/gif', quality: 1.0 },
      'bmp': { mimeType: 'image/bmp', quality: 1.0 },
      'ico': { mimeType: 'image/x-icon', quality: 1.0 }
    };

    return settings[format.toLowerCase()] || { mimeType: 'image/png', quality: 0.9 };
  }

  // получение типа по формату
  private getMimeTypeFromFormat(format: string): string {
    const mimeTypes: { [key: string]: string } = {
      'txt': 'text/plain',
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'rtf': 'application/rtf'
    };

    return mimeTypes[format.toLowerCase()] || 'application/octet-stream';
  }

  // отображение ошибки
  private showError(message: string): void {
    this.conversionResult = {
      success: false,
      message: message
    };
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
      
      // очистка URL после скачивания
      setTimeout(() => {
        URL.revokeObjectURL(this.downloadUrl);
      }, 100);
    }
  }
}