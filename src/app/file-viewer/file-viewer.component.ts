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

  constructor(private fileService: FileService) { }

  async ngOnInit() {
    await this.loadFiles();
  }

  async loadFiles() {
    try {
      this.textFiles = await this.fileService.readDirectory('/data/data/io.ionic.starter/', Directory.Data);
      this.imageFiles = await this.fileService.readDirectory('image-files', Directory.Data);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  }

  async readTextFile(fileName: string) {
    try {
      this.selectedFileContent = await this.fileService.readFile(`/data/data/io.ionic.starter/${fileName}`, Directory.Data);
    } catch (error) {
      console.error('Error reading text file:', error);
      this.selectedFileContent = 'Failed to load file content.';
    }
  }

  async function openImageFile(filename: string, directory: Directory): Promise<void> {
    try {
      // Проверяем, существует ли файл
      const files = await readDataDir(directory);
      if (!files.includes(filename)) {
        throw new Error(`File "${filename}" does not exist in the directory.`);
      }
  
      // Получаем тип файла
      const fileType = await getFileType(filename, directory);
      if (!fileType.startsWith('image/')) {
        throw new Error(`File "${filename}" is not an image file.`);
      }
  
      // Читаем содержимое файла
      const fileContent = await readFile(filename, directory);
  
      // Преобразуем содержимое файла в URL для отображения
      const imageUrl = `data:${fileType};base64,${fileContent}`;
  
      // Открываем изображение (например, в новом окне или с использованием Ionic компонентов)
      console.log('Image URL:', imageUrl);
      // Здесь можно добавить логику для отображения изображения
    } catch (error) {
      console.error('Error opening image file:', error);
    }
  }

  async deleteFile(fileName: string) {
    try {
      await this.fileService.deleteFile(`/data/data/io.ionic.starter/${fileName}`, Directory.Data);
      await this.loadFiles(); // Обновление списка файлов
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async uploadFiles() {
    try {
      // Логика для загрузки файлов на устройство
      console.log('Uploading files...');
      // Пример: можно использовать File Picker или другие библиотеки для загрузки файлов
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }

  async downloadFiles() {
    try {
      // Логика для выгрузки файлов с устройства
      console.log('Downloading files...');
      // Пример: можно использовать File Saver или другие библиотеки для выгрузки файлов
    } catch (error) {
      console.error('Error downloading files:', error);
    }
  }

  async readDefDir() {
    this.allFiles = await this.fileService.readDirectoryExt(".");
  }

  getImageUrl(fileName: string): string {
    return `/data/data/com.example.app/files/image-files/${fileName}`;
  }

  async saveTextFileDBG() {
    const fileName = 'success.txt'; // Name of the file to be saved
    const fileContent = 'This is a successfully written text file'; // Content of the file

    try {
      // Write the file to the 'text-files' directory

      await this.fileService.writeFile('/data/data/io.ionic.starter/' + fileName, fileContent, Directory.Data);

      // Reload files to update the list
      await this.loadFiles();

      console.log('Text file saved successfully!');
    } catch (error) {
      console.error('Error saving text file:', error);
    }
  }
}