
import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding, ReadFileResult, ReaddirResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  async readFile(path: string, directory: Directory = Directory.Data): Promise<string> {
    const contents: ReadFileResult = await Filesystem.readFile({
      path,
      directory,
      encoding: Encoding.UTF8
    });
    return contents.data as string;
  }

  async readDirectory(path: string, directory: Directory = Directory.Data): Promise<string[]> {
    const result: ReaddirResult = await Filesystem.readdir({
      path,
      directory
    });
    return result.files.map(fileInfo => fileInfo.name);
  }
}