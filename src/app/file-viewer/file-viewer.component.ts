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
      this.textFiles = await this.fileService.readDataDir(dataDir);
      this.imageFiles = await this.fileService.readDataDir(dataDir); // Assuming image files are in the same directory
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

  async deleteFile(fileName: string) {
    try {
      const dataDir = await this.fileService.getDataDir();
      await this.fileService.deleteFile(fileName, dataDir);
      await this.loadFiles(); // Обновление списка файлов
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async uploadFiles() {
    try {
      const externalFilePath = await this.fileService.chooseExternalFile();
      if (!externalFilePath) {
        throw new Error ('File not selected');
      }
      console.log('Uploading file:', externalFilePath);
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
}
