import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WardrobeStorageService {
  private STORAGE_KEY = 'wardrobe_items';

  constructor() { }

  getItems() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  addItem(item: any) {
    const items = this.getItems();
    const newItem = {
      ...item,
      id: Date.now() + Math.random(),
      createdAt: new Date()
    };
    items.push(newItem);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    return newItem;
  }

  deleteItem(id: any) {
    let items = this.getItems();
    items = items.filter((item: any) => item.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }
}

