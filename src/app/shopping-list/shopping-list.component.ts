import { Component, OnInit } from '@angular/core';

type ItemStatus = 'не куплен' | 'куплен' | 'нет';

interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  status: ItemStatus;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  items: ShoppingItem[] = [];
  newItemName = '';
  newItemQuantity = 1;
  activeTab: 'list' | 'add' = 'list';

  statusOptions = [
    { value: 'не куплен', label: 'Не куплен', color: '#ff3d3d' },
    { value: 'куплен', label: 'Куплен', color: '#3880ff' },
    { value: 'нет', label: 'Нет в наличии', color: '#10dc60' }
  ];

  private readonly STORAGE_KEY = 'shopping_list_items';

  ngOnInit() {
    this.loadItems();
  }

  private loadItems() {
    const savedItems = localStorage.getItem(this.STORAGE_KEY);
    if (savedItems) {
      try {
        this.items = JSON.parse(savedItems);
      } catch (e) {
        console.error('Ошибка загрузки списка:', e);
        this.items = [];
      }
    }
  }

  private saveItems() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
  }

  addItem() {
    if (this.newItemName.trim()) {
      this.items = [{
        id: Date.now(),
        name: this.newItemName.trim(),
        quantity: this.newItemQuantity || 1,
        status: 'не куплен'
      }, ...this.items];
      
      this.newItemName = '';
      this.newItemQuantity = 1;
      this.activeTab = 'list';
      this.saveItems();
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveItems();
  }

  changeStatus(id: number, newStatus: ItemStatus) {
    this.items = this.items.map(item => 
      item.id === id ? {...item, status: newStatus} : item
    );
    this.saveItems();
  }

  getStatusColor(status: ItemStatus): string {
    return this.statusOptions.find(opt => opt.value === status)?.color || '#666';
  }

  getStatusLabel(status: ItemStatus): string {
    return this.statusOptions.find(opt => opt.value === status)?.label || 'Неизвестно';
  }

  switchTab(tab: 'list' | 'add') {
    this.activeTab = tab;
  }
}