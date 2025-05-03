import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

type ItemStatus = 'не куплен' | 'куплен' | 'нет';

interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  status: ItemStatus;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  items: ShoppingItem[] = [];
  categories: Category[] = [];
  newItemName = '';
  newItemQuantity = 1;
  newCategoryName = '';
  selectedCategoryId: number | null = null;
  activeTab: 'list' | 'add' | 'categories' = 'list';

  statusOptions = [
    { value: 'не куплен', label: 'Не куплен', color: '#ff3d3d' },
    { value: 'куплен', label: 'Куплен', color: '#3880ff' },
    { value: 'нет', label: 'Нет в наличии', color: '#10dc60' }
  ];

  private readonly STORAGE_KEY = 'shopping_list_data';

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        this.items = data.items || [];
        this.categories = data.categories || [];
        
        console.log('Загруженные данные:', {
          items: this.items,
          categories: this.categories
        });
      } catch (e) {
        console.error('Ошибка загрузки данных:', e);
      }
    }
  }

  private saveData() {
    const data = {
      items: this.items,
      categories: this.categories
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    console.log('Данные сохранены:', data);
  }

  addItem() {
    if (this.newItemName.trim() && this.selectedCategoryId) {
      console.log('Selected Category ID:', this.selectedCategoryId, typeof this.selectedCategoryId);
      
      const newItem: ShoppingItem = {
        id: Date.now(),
        name: this.newItemName.trim(),
        quantity: this.newItemQuantity || 1,
        status: 'не куплен',
        categoryId: this.selectedCategoryId // Теперь это точно число
      };
      
      this.items = [newItem, ...this.items];
      this.saveData();
      this.cdRef.detectChanges();
      
      this.newItemName = '';
      this.newItemQuantity = 1;
    }
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now(),
        name: this.newCategoryName.trim()
      };
      
      this.categories = [newCategory, ...this.categories];
      this.newCategoryName = '';
      this.saveData();
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveData();
  }

  removeCategory(id: number) {
    this.categories = this.categories.filter(cat => cat.id !== id);
    this.items = this.items.filter(item => item.categoryId !== id);
    this.saveData();
  }

  changeStatus(id: number, newStatus: ItemStatus) {
    this.items = this.items.map(item => 
      item.id === id ? {...item, status: newStatus} : item
    );
    this.saveData();
  }

  getItemsByCategory(categoryId: number): ShoppingItem[] {
    const filteredItems = this.items.filter(item => item.categoryId === categoryId);
    console.log(`Товары для категории ${categoryId}:`, filteredItems);
    return filteredItems;
  }

  getStatusColor(status: ItemStatus): string {
    return this.statusOptions.find(opt => opt.value === status)?.color || '#666';
  }

  getStatusLabel(status: ItemStatus): string {
    return this.statusOptions.find(opt => opt.value === status)?.label || 'Неизвестно';
  }

  switchTab(tab: 'list' | 'add' | 'categories') {
    this.activeTab = tab;
  }
}