import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding, ReadFileResult, ReaddirResult } from '@capacitor/filesystem';
import { PickFilesOptions, FilePicker } from '@capawesome/capacitor-file-picker';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  /**
   * [x] 1. getDataDir(): Promise<Directory>
   * [x] 2. readDataDir(directory: Directory): Promise<string[]>
   * [x] 3. createEmptyFile(filename: string, directory: Directory): Promise<void>
   * [x] 4. writeFile(filename: string, data_base64: string, directory: Directory): Promise<void>
   * [x] 5. readFile(filename: string, directory: Directory): Promise<string>
   * [x] 6. deleteFile(filename: string, directory: Directory): Promise<void>
   * [x] 7. getFileType(filename: string, directory: Directory): Promise<string>
   * [x] 8. chooseExternalFile(): Promise<string>
   * [x] 9. copyExternalFile(path_ext: string, filename: string, directory: Directory): Promise<void>
   */

  constructor() { }

  /**
   * Получение директории данных
   * @returns Директория данных
   */
  async getDataDir(): Promise<Directory> {
    return Directory.Data;
  }

  /**
   * Чтение списка файлов в директории данных
   * @param directory Директория (по умолчанию Directory.Data)
   * @returns Массив имен файлов
   */
  async readDataDir(directory: Directory = Directory.Data): Promise<string[]> {
    try {
      const result: ReaddirResult = await Filesystem.readdir({
        path: '',
        directory
      });
      return result.files.map(fileInfo => fileInfo.name);
    } catch (error) {
      console.error('Error reading data directory:', error);
      throw new Error('Failed to read data directory');
    }
  }

  /**
   * Создание пустого файла
   * @param filename Имя файла
   * @param directory Директория (по умолчанию Directory.Data)
   */
  async createEmptyFile(filename: string, directory: Directory = Directory.Data): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: filename,
        data: '',
        directory,
        encoding: Encoding.UTF8,
        recursive: true
      });
    } catch (error) {
      console.error('Error creating empty file:', error);
      throw new Error('Failed to create empty file');
    }
  }

  /**
   * Запись данных в файл
   * @param filename Имя файла
   * @param data_base64 Данные в формате base64
   * @param directory Директория (по умолчанию Directory.Data)
   */
  async writeFile(filename: string, data_base64: string, directory: Directory = Directory.Data): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: filename,
        data: data_base64,
        directory,
        encoding: Encoding.UTF8,
        recursive: true
      });
    } catch (error) {
      console.error('Error writing file:', error);
      throw new Error('Failed to write file');
    }
  }

  /**
   * Чтение содержимого файла
   * @param filename Имя файла
   * @param directory Директория (по умолчанию Directory.Data)
   * @returns Содержимое файла в виде строки
   */
  async readFile(filename: string, directory: Directory = Directory.Data): Promise<string> {
    try {
      const contents: ReadFileResult = await Filesystem.readFile({
        path: filename,
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
   * Удаление файла
   * @param filename Имя файла
   * @param directory Директория (по умолчанию Directory.Data)
   */
  async deleteFile(filename: string, directory: Directory = Directory.Data): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path: filename,
        directory
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }

  /**
   * Получение типа файла
   * @param filename Имя файла
   * @param directory Директория (по умолчанию Directory.Data)
   * @returns Тип файла (MIME-тип)
   */
  async getFileType(filename: string, directory: Directory = Directory.Data): Promise<string> {
    try {
      const result = await Filesystem.stat({
        path: filename,
        directory
      });
      return result.type;
    } catch (error) {
      console.error('Error getting file type:', error);
      throw new Error('Failed to get file type');
    }
  }

  /**
   * Выбор внешнего файла
   * @returns Путь к выбранному файлу
   */
  async chooseExternalFile(): Promise<string | undefined> {
    try {
      const can_read_ext = this.checkFilePickerAccess();
      if (!can_read_ext) {
        throw new Error('Failed to get correct file permissions');
      }
      const result = await FilePicker.pickFiles();
  
      // Return the path of the selected file
      return result.files[0].path;
    } catch (error) {
      console.error('Error choosing external file:', error);
      throw new Error('Failed to choose external file');
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
   * Копирование внешнего файла в директорию данных приложения
   * @param path_ext Внешний путь к файлу
   * @param filename Имя файла, под которым он будет сохранен
   * @param directory Директория (по умолчанию Directory.Data)
   */
  async copyExternalFile(path_ext: string, filename: string, directory: Directory = Directory.Data): Promise<void> {
    try {
      // Чтение содержимого внешнего файла
      const externalFileContent = await Filesystem.readFile({
        path: path_ext,
        directory: Directory.External
      });

      // Запись содержимого в новый файл в указанной директории
      await Filesystem.writeFile({
        path: filename,
        data: externalFileContent.data,
        directory,
        encoding: Encoding.UTF8,
        recursive: true
      });

      console.log(`File copied successfully to ${directory}/${filename}`);
    } catch (error) {
      console.error('Error copying external file:', error);
      throw new Error('Failed to copy external file');
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

  async checkFilePickerAccess(): Promise<boolean> {
    try {
      const perm = await FilePicker.checkPermissions();
      if (perm.readExternalStorage != 'granted') {
        const perm_r = await FilePicker.requestPermissions();
        if (perm_r.readExternalStorage != 'granted') {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error accessing file picker:', error);
      return false; // Permissions are denied or an error occurred
    }
  }
}
