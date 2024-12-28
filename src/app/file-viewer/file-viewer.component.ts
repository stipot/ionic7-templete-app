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

  async openImage(fileName: string) {
    try {
      const dataDir = await this.fileService.getDataDir();
      const fileContent = await this.fileService.readFile(fileName, dataDir);
      const fileType = await this.fileService.getFileType(fileName, dataDir);
      this.selectedImageUrl = `data:${fileType};base64,${fileContent}`;
    } catch (error) {
      console.error('Error opening image file:', error);
      this.selectedImageUrl = null;
    }
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
}
