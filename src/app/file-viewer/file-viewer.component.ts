import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {
  textFiles: string[] = [];
  imageFiles: string[] = [];
  allFiles: string[] = [];
  selectedFileContent: string = '';
  selectedImageUrl: string | null = null;

  constructor(private fileService: FileService) { }

  async ngOnInit() {
    await this.loadFiles();
  }

  async loadFiles() {
    try {
      const dataDir = await this.fileService.getDataDir();
      //this.textFiles = await this.fileService.readDataDir(dataDir);
      //this.imageFiles = await this.fileService.readDataDir(dataDir); // Assuming image files are in the same directory
      this.allFiles = await this.fileService.readDataDir(dataDir);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  }

  async readTextFile(fileName: string) {
    try {
      const dataDir = await this.fileService.getDataDir();
      this.selectedFileContent = await this.fileService.readFile(fileName, dataDir);
    } catch (error) {
      console.error('Error reading text file:', error);
      this.selectedFileContent = 'Failed to load file content.';
    }
  }

  private getMimeType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
      const mimeTypes: { [key: string]: string } = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'bmp': 'image/bmp',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
        'tiff': 'image/tiff',
        'ico': 'image/x-icon',
        'heic': 'image/heic',
        'avif': 'image/avif'
      };
    
      return mimeTypes[extension] || 'application/octet-stream';
    }

  async openImage(fileName: string) {
    try {
      const dataDir = await this.fileService.getDataDir();
      const fileContent = await this.fileService.readFile(fileName, dataDir);
      const mimeType = this.getMimeType(fileName);
  
      if (mimeType === 'application/octet-stream') {
        console.warn('Unsupported image format');
        this.selectedImageUrl = null;
        return;
      }
  
      this.selectedImageUrl = `data:${mimeType};base64,${fileContent}`;
    } catch (error) {
      console.error('Error opening image file:', error);
      this.selectedImageUrl = null;
    }
  }

  isImageFile(fileName: string): boolean {
    const mimeType = this.getMimeType(fileName);
    return mimeType.startsWith('image/');
  }

  async deleteSelectedFile(fileName: string) {
    try {
      const dataDir = await this.fileService.getDataDir();
      await this.fileService.deleteFile(fileName, dataDir);
      await this.loadFiles(); // Обновление списка файлов
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async uploadFromStorage() {
    try {
      const externalFilePath = await this.fileService.chooseExternalFile();
      if (!externalFilePath) {
        throw new Error ('File not selected');
      }
      console.log('Uploading file:', externalFilePath);
      const extFilePath = await this.fileService.chooseExternalFile();

      if (extFilePath === undefined || !extFilePath) {
        throw new Error('Could not select file');
      }

      const localFilename = extFilePath!.split('\\')!.pop()!.split('/').pop()!;
      this.fileService.copyExternalFile(extFilePath, localFilename);

    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }

  async downloadFiles() {
    try {
      const dataDir = await this.fileService.getDataDir();
      const fileContent = await this.fileService.readFile('example.txt', dataDir);
      console.log('Downloading file content:', fileContent);
    } catch (error) {
      console.error('Error downloading files:', error);
    }
  }

  async readDefDir() {
    this.allFiles = await this.fileService.readDataDir(await this.fileService.getDataDir());
  }

  getImageUrl(fileName: string): string {
    return `/data/data/com.example.app/files/image-files/${fileName}`;
  }

  async saveTextFileDBG() {
    const fileName = 'success.txt'; // Name of the file to be saved
    const fileContent = 'This is a successfully written text file'; // Content of the file

    try {
      const dataDir = await this.fileService.getDataDir();
      await this.fileService.writeFile(fileName, btoa(fileContent), dataDir);
      await this.loadFiles();
      console.log('Text file saved successfully!');
    } catch (error) {
      console.error('Error saving text file:', error);
    }
  }

  async openFile3(filename: string): Promise<void> {
    try {
      const dataDir = await this.fileService.getDataDir(); // Name of the file to be saved
      const fileContent = 'This is a successfully written text file'; // Content of the file

      const contentText = await this.fileService.readFile(filename, dataDir);
      this.selectedFileContent = atob(contentText);

      console.log('Text file must be opened successfully!');
    } catch (error) {
      console.error('Error opening text file:', error);
    }
  }

  async fileOpen2(filename: string): Promise<void> {
    try {
      const dataDir = await this.fileService.getDataDir();
      const fileContent = await this.fileService.readFile(filename, dataDir);
      
      // Проверяем, является ли файл изображением
      if (this.isImageFile(filename)) {
        const mimeType = this.getMimeType(filename);
        
        if (mimeType === 'application/octet-stream') {
          console.warn('Неподдерживаемый формат изображения');
          this.selectedImageUrl = null;
          return;
        }
        
        // Устанавливаем URL изображения
        this.selectedImageUrl = 'data:${mimeType};base64,${fileContent}';
        // Сбрасываем контент текстового файла
        this.selectedFileContent = '';
      } else {
        // Если это текстовый файл
        this.selectedFileContent = atob(fileContent);
        // Сбрасываем URL изображения
        this.selectedImageUrl = null;
      }
    } catch (error) {
      console.error('Ошибка при открытии файла:', error);
      this.selectedFileContent = 'Не удалось загрузить содержимое файла.';
      this.selectedImageUrl = null;
    }
  }

  /**
   * 1. listAllFiles()
   * 2. fileOpen(filename: string): Promise<void>
   * 3. fileUpload(directory: Directory): Promise<void>
   * 4. -- fileDownload()
   */
}
