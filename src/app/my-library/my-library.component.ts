import { Component, OnInit } from '@angular/core';

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  color: string;
  year?: number;
  note?: string;
}

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent implements OnInit {
  readonly storageKey = 'expressive-book-library';

  library: LibraryBook[] = [];
  draggingIndex: number | null = null;
  statusMessage = '';

  newBook: Pick<LibraryBook, 'title' | 'author' | 'year' | 'note'> = {
    title: '',
    author: '',
    year: undefined,
    note: '',
  };

  private readonly palette = [
    '#ff5c8a',
    '#ff9f1c',
    '#2ec4b6',
    '#7b61ff',
    '#00a8e8',
    '#ef476f',
    '#06d6a0',
    '#ffd166',
    '#9b5de5',
  ];

  private readonly sampleBooks: LibraryBook[] = [
    {
      id: 'sample-1',
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      year: 1967,
      note: 'Мистика, сатира и московская атмосфера.',
      color: '#ff5c8a',
    },
    {
      id: 'sample-2',
      title: '1984',
      author: 'Джордж Оруэлл',
      year: 1949,
      note: 'Антиутопия о контроле и свободе.',
      color: '#7b61ff',
    },
    {
      id: 'sample-3',
      title: '451° по Фаренгейту',
      author: 'Рэй Брэдбери',
      year: 1953,
      note: 'История о книгах, памяти и сопротивлении.',
      color: '#ff9f1c',
    },
  ];

  ngOnInit(): void {
    this.library = this.loadLibrary();
  }

  get totalBooks(): number {
    return this.library.length;
  }

  get libraryJsonPreview(): string {
    return JSON.stringify(this.library, null, 2);
  }

  addManualBook(): void {
    const title = this.newBook.title.trim();
    const author = this.newBook.author.trim();

    if (!title || !author) {
      this.setStatus('Введите название и автора книги.');
      return;
    }

    const book: LibraryBook = {
      id: this.createId(),
      title,
      author,
      year: this.normalizeYear(this.newBook.year),
      note: this.newBook.note?.trim() || '',
      color: this.getRandomColor(),
    };

    this.library = [book, ...this.library];
    this.resetNewBook();
    this.persistLibrary();
    this.setStatus(`Книга «${book.title}» добавлена на полку.`);
  }

  addRandomBook(): void {
    const randomBooks: Array<Omit<LibraryBook, 'id' | 'color'>> = [
      { title: 'Тень ветра', author: 'Карлос Руис Сафон', year: 2001, note: 'Книжный лабиринт и тайны старого города.' },
      { title: 'Дюна', author: 'Фрэнк Герберт', year: 1965, note: 'Пустынная планета, политика и судьба.' },
      { title: 'Над пропастью во ржи', author: 'Джером Сэлинджер', year: 1951, note: 'Голос взросления и внутреннего бунта.' },
      { title: 'Имя розы', author: 'Умберто Эко', year: 1980, note: 'Детектив, монастырь и сила текстов.' },
    ];

    const source = randomBooks[Math.floor(Math.random() * randomBooks.length)];
    const book: LibraryBook = {
      ...source,
      id: this.createId(),
      color: this.getRandomColor(),
    };

    this.library = [book, ...this.library];
    this.persistLibrary();
    this.setStatus(`Случайная книга «${book.title}» добавлена.`);
  }

  deleteBook(index: number): void {
    if (!this.isIndexValid(index)) {
      return;
    }

    const [removed] = this.library.splice(index, 1);
    this.library = [...this.library];
    this.persistLibrary();
    this.setStatus(`Книга «${removed.title}» удалена.`);
  }

  moveBook(index: number, direction: -1 | 1): void {
    const targetIndex = index + direction;

    if (!this.isIndexValid(index) || !this.isIndexValid(targetIndex)) {
      return;
    }

    const updated = [...this.library];
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    this.library = updated;
    this.persistLibrary();
  }

  dragStart(event: DragEvent, index: number): void {
    this.draggingIndex = index;
    event.dataTransfer?.setData('text/plain', String(index));
    event.dataTransfer?.setDragImage(event.target as Element, 20, 20);
  }

  dragOver(event: DragEvent): void {
    event.preventDefault();
  }

  drop(event: DragEvent, targetIndex: number): void {
    event.preventDefault();

    const rawIndex = event.dataTransfer?.getData('text/plain');
    const sourceIndex = rawIndex ? Number(rawIndex) : this.draggingIndex;

    if (sourceIndex === null || Number.isNaN(sourceIndex) || sourceIndex === targetIndex) {
      this.dragEnd();
      return;
    }

    this.reorderBook(sourceIndex, targetIndex);
    this.dragEnd();
  }

  dragEnd(): void {
    this.draggingIndex = null;
  }

  downloadLibrary(): void {
    const blob = new Blob([this.libraryJsonPreview], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `my-library-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    this.setStatus('Коллекция скачана как JSON-файл.');
  }

  uploadBooks(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const books = this.normalizeImportedBooks(parsed);

        if (!books.length) {
          this.setStatus('В JSON не найдено подходящих книг.');
          return;
        }

        this.library = books;
        this.persistLibrary();
        this.setStatus(`Загружено книг: ${books.length}.`);
      } catch {
        this.setStatus('Не удалось прочитать JSON-файл. Проверьте формат файла.');
      } finally {
        input.value = '';
      }
    };

    reader.readAsText(file);
  }

  clearLibrary(): void {
    this.library = [];
    this.persistLibrary();
    this.setStatus('Полка очищена.');
  }

  restoreSamples(): void {
    this.library = this.sampleBooks.map((book) => ({ ...book, id: this.createId() }));
    this.persistLibrary();
    this.setStatus('Демо-коллекция восстановлена.');
  }

  private reorderBook(sourceIndex: number, targetIndex: number): void {
    if (!this.isIndexValid(sourceIndex) || !this.isIndexValid(targetIndex)) {
      return;
    }

    const updated = [...this.library];
    const [movedBook] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, movedBook);
    this.library = updated;
    this.persistLibrary();
  }

  private loadLibrary(): LibraryBook[] {
    const saved = localStorage.getItem(this.storageKey);

    if (!saved) {
      return [...this.sampleBooks];
    }

    try {
      const parsed = JSON.parse(saved);
      const books = this.normalizeImportedBooks(parsed);
      return books.length ? books : [...this.sampleBooks];
    } catch {
      return [...this.sampleBooks];
    }
  }

  private persistLibrary(): void {
    localStorage.setItem(this.storageKey, this.libraryJsonPreview);
  }

  private normalizeImportedBooks(value: unknown): LibraryBook[] {
    const rawBooks = Array.isArray(value) ? value : (value as { books?: unknown[] })?.books;

    if (!Array.isArray(rawBooks)) {
      return [];
    }

    return rawBooks
      .filter((book): book is Partial<LibraryBook> => Boolean(book && typeof book === 'object'))
      .map((book) => ({
        id: typeof book.id === 'string' ? book.id : this.createId(),
        title: String(book.title || '').trim(),
        author: String(book.author || '').trim(),
        year: this.normalizeYear(book.year),
        note: String(book.note || '').trim(),
        color: typeof book.color === 'string' && book.color.trim() ? book.color : this.getRandomColor(),
      }))
      .filter((book) => Boolean(book.title && book.author));
  }

  private resetNewBook(): void {
    this.newBook = {
      title: '',
      author: '',
      year: undefined,
      note: '',
    };
  }

  private normalizeYear(year: unknown): number | undefined {
    const normalized = Number(year);
    return Number.isInteger(normalized) && normalized > 0 ? normalized : undefined;
  }

  private isIndexValid(index: number): boolean {
    return index >= 0 && index < this.library.length;
  }

  private getRandomColor(): string {
    return this.palette[Math.floor(Math.random() * this.palette.length)];
  }

  private createId(): string {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  private setStatus(message: string): void {
    this.statusMessage = message;
  }
}
