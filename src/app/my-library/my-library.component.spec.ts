import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MyLibraryComponent } from './my-library.component';

describe('MyLibraryComponent', () => {
  let component: MyLibraryComponent;
  let fixture: ComponentFixture<MyLibraryComponent>;

  beforeEach(waitForAsync(() => {
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
});
