import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list.component';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingListComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item with default status', () => {
    component.newItemName = 'Молоко';
    component.addItem();
    expect(component.items.length).toBe(1);
    expect(component.items[0].status).toBe('не куплен');
  });

  it('should add new item at the beginning of array', () => {
    component.items = [
      { id: 1, name: 'Хлеб', quantity: 1, status: 'не куплен' }
    ];
    component.newItemName = 'Молоко';
    component.addItem();
    expect(component.items.length).toBe(2);
    expect(component.items[0].name).toBe('Молоко'); // Проверяем что новый элемент первый
    expect(component.items[1].name).toBe('Хлеб');
  });

  it('should change item status', () => {
    component.items = [
      { id: 1, name: 'Хлеб', quantity: 1, status: 'не куплен' }
    ];
    component.changeStatus(1, 'куплен');
    expect(component.items[0].status).toBe('куплен');
  });

  it('should return correct status color', () => {
    expect(component.getStatusColor('не куплен')).toBe('#ff3d3d');
    expect(component.getStatusColor('куплен')).toBe('#3880ff');
    expect(component.getStatusColor('нет')).toBe('#10dc60');
  });

  it('should return correct status label', () => {
    expect(component.getStatusLabel('не куплен')).toBe('Не куплен');
    expect(component.getStatusLabel('куплен')).toBe('Куплен');
    expect(component.getStatusLabel('нет')).toBe('Нет в наличии');
  });
});