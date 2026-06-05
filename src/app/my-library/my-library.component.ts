import { Component, OnInit } from '@angular/core';

interface Book {
  id: string;
  title: string;
  author: string;
  color: string;
  subtitle?: string;
}

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent implements OnInit {
  library: Book[] = [
    { id: this.generateId(), title: 'Город ветров', author: 'Алексей Смирнов', color: '#ff5f6d' },
    { id: this.generateId(), title: 'Ночной архив', author: 'Мария Крылова', color: '#8f5fce' },
    { id: this.generateId(), title: 'Зеркало времени', author: 'Иван Петров', color: '#28c76f' },
    { id: this.generateId(), title: 'Лабиринт мыслей', author: 'Екатерина Лещенко', color: '#00a8cc' },
  ];

  newBook: Partial<Book> = {
    title: '',
    author: '',
    color: '#f39c12',
  };

  draggingIndex: number | null = null;

  constructor() {}

  ngOnInit() {}

  addManualBook() {
    if (!this.newBook.title?.trim() || !this.newBook.author?.trim()) {
      return;
    }

    this.library.unshift({
      id: this.generateId(),
      title: this.newBook.title.trim(),
      author: this.newBook.author.trim(),
      color: this.newBook.color || this.randomColor(),
    });

    this.newBook.title = '';
    this.newBook.author = '';
  }

  addRandomBook() {
    const samples = [
      { title: 'Портал памяти', author: 'Сергей Гринев', color: '#f86624' },
      { title: 'Тайна планеты', author: 'Ольга Белова', color: '#6a89cc' },
      { title: 'Музыка тишины', author: 'Наталия Яковлева', color: '#f6b93b' },
      { title: 'Волны сознания', author: 'Даниил Орлов', color: '#38ada9' },
    ];
    const book = samples[Math.floor(Math.random() * samples.length)];
    this.library.unshift({ id: this.generateId(), ...book });
  }

  deleteBook(index: number) {
    this.library.splice(index, 1);
  }

  moveBook(index: number, direction: number) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= this.library.length) {
      return;
    }
    this.reorderBooks(index, targetIndex);
  }

  dragStart(event: DragEvent, index: number) {
    this.draggingIndex = index;
    event.dataTransfer?.setData('text/plain', String(index));
    event.dataTransfer?.setDragImage(new Image(), 0, 0);
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent, index: number) {
    event.preventDefault();
    if (this.draggingIndex === null) {
      return;
    }
    this.reorderBooks(this.draggingIndex, index);
    this.draggingIndex = null;
  }

  dragEnd() {
    this.draggingIndex = null;
  }

  reorderBooks(from: number, to: number) {
    if (from === to) {
      return;
    }
    const item = this.library.splice(from, 1)[0];
    this.library.splice(to, 0, item);
  }

  uploadBooks(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = reader.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          this.library = parsed.map((book) => this.normalizeBook(book));
        } else {
          this.library = [this.normalizeBook(parsed)];
        }
      } catch {
        console.warn('Не удалось загрузить коллекцию. Файл должен быть в формате JSON.');
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  downloadLibrary() {
    const data = JSON.stringify(this.library, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `library-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private normalizeBook(book: any): Book {
    return {
      id: book?.id || this.generateId(),
      title: String(book?.title || 'Без названия'),
      author: String(book?.author || 'Неизвестный автор'),
      color: String(book?.color || this.randomColor()),
      subtitle: book?.subtitle ? String(book.subtitle) : undefined,
    };
  }

  private generateId(): string {
    return Math.random().toString(36).slice(2, 11);
  }

  private randomColor(): string {
    const palette = ['#ff8c00', '#00b894', '#6c5ce7', '#e17055', '#00cec9', '#fdcb6e'];
    return palette[Math.floor(Math.random() * palette.length)];
  }
}
