import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MyLibraryComponent } from './my-library.component';

describe('MyLibraryComponent', () => {
  let component: MyLibraryComponent;
  let fixture: ComponentFixture<MyLibraryComponent>;

  beforeEach(waitForAsync(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      declarations: [MyLibraryComponent],
      imports: [IonicModule.forRoot(), FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sample books', () => {
    expect(component.library.length).toBeGreaterThan(0);
  });

  it('should add a manual book when title and author are set', () => {
    const initialLength = component.library.length;
    component.newBook.title = 'Тестовая книга';
    component.newBook.author = 'Тестовый автор';
    component.addManualBook();

    expect(component.library.length).toBe(initialLength + 1);
    expect(component.library[0].title).toBe('Тестовая книга');
    expect(component.library[0].author).toBe('Тестовый автор');
  });

  it('should not add a manual book without title or author', () => {
    const initialLength = component.library.length;
    component.newBook.title = 'Без автора';
    component.newBook.author = '';
    component.addManualBook();

    expect(component.library.length).toBe(initialLength);
  });

  it('should delete a book', () => {
    const initialLength = component.library.length;
    component.deleteBook(0);

    expect(component.library.length).toBe(initialLength - 1);
  });

  it('should move a book to the right', () => {
    const firstBook = component.library[0];
    component.moveBook(0, 1);

    expect(component.library[1]).toBe(firstBook);
  });

  it('should restore sample books after clearing the shelf', () => {
    component.clearLibrary();
    expect(component.library.length).toBe(0);

    component.restoreSamples();
    expect(component.library.length).toBeGreaterThan(0);
  });
});
