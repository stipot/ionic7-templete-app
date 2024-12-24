import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding, ReadFileResult, ReaddirResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  /**
   * [ ] 1. getDataDir(): Promise<Directory>
   * [ ] 2. readDataDir(directory: Directory): Promise<string[]>
   * [ ] 3. createEmptyFile(filename: string, directory: Directory): Promise<void>
   * [ ] 4. writeFile(filename: string, data_base64: string, directory: Directory): Promise<void>
   * [ ] 5. readFile(filename: string, directory: Directory): Promise<string>
   * [ ] 6. deleteFile(filename: string, directory: Directory): Promise<void>
   * [ ] 7. getFileType(filename: string, directory: Directory): Promise<string>
   * [ ] 8. chooseExternalFile(): Promise<string>
   */

  constructor() { }

  /**
   * Чтение содержимого файла
   * @param path Путь к файлу
   * @param directory Директория (по умолчанию Directory.Data)
   * @returns Содержимое файла в виде строки
   */
  async readFile(path: string, directory: Directory = Directory.Data): Promise<string> {
    try {
      const contents: ReadFileResult = await Filesystem.readFile({
        path,
        directory,
        encoding: Encoding.UTF8
      });
      return contents.data as string;
    } catch (error) {
      console.error('Error reading file:', error);
      throw new Error('Failed to read file');
    }
  }

  /**
   * Чтение списка файлов в директории
   * @param path Путь к директории
   * @param directory Директория (по умолчанию Directory.Data)
   * @returns Массив имен файлов
   */
  async readDirectory(path: string, directory: Directory = Directory.Data): Promise<string[]> {
    try {
      const result: ReaddirResult = await Filesystem.readdir({
        path,
        directory
      });
      console.log(result);
      return result.files.map(fileInfo => fileInfo.name);
    } catch (error) {
      console.error('Error reading directory:', error);
      throw new Error('Failed to read directory');
    }
  }

  async readDirectoryExt(path: string, directory: Directory = Directory.External): Promise<string[]> {
    try {
      const result: ReaddirResult = await Filesystem.readdir({
        path,
        directory
      });
      console.log(result);
      return result.files.map(fileInfo => fileInfo.name);
    } catch (error) {
      console.error('Error reading directory:', error);
      throw new Error('Failed to read directory');
    }
  }

  /**
   * Получение URL файла для отображения
   * @param path Путь к файлу
   * @param directory Директория (по умолчанию Directory.Data)
   * @returns URL файла
   */
  async getFileUrl(path: string, directory: Directory = Directory.Data): Promise<string> {
    try {
      const result = await Filesystem.getUri({
        path,
        directory
      });
      return result.uri;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw new Error('Failed to get file URL');
    }
  }

  /**
   * Удаление файла
   * @param path Путь к файлу
   * @param directory Директория (по умолчанию Directory.Data)
   */
  async deleteFile(path: string, directory: Directory = Directory.Data): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path,
        directory
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }

  async writeFile(path: string, data: string, directory: Directory = Directory.Data): Promise<void> {
    try {
      await Filesystem.writeFile({
        path,
        data,
        directory,
        encoding: Encoding.UTF8,
        recursive: true
      });
    } catch (error) {
      console.error("ERROR -- CANNOT WRITE FILE");
      throw new Error("Failed to write file");
    }
  }
}