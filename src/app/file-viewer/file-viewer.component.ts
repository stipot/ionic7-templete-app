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
  selectedFileContent: string = '';

  constructor(private fileService: FileService) { }

  async ngOnInit() {
    await this.loadFiles();
  }

  async loadFiles() {
    this.textFiles = await this.fileService.readDirectory('text-files', Directory.Data);
    this.imageFiles = await this.fileService.readDirectory('image-files', Directory.Data);
  }

  async readTextFile(fileName: string) {
    this.selectedFileContent = await this.fileService.readFile('text-files/${fileName}', Directory.Data);
  }
}