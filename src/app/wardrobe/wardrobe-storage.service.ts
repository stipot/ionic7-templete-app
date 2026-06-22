import { Injectable } from '@angular/core';

export interface WardrobeItem {
  id: number;
  name: string;
  type: string;
  season: string;
  size: string;
  photo?: string;
  createdAt: string;
}

export type WardrobeItemInput = Omit<WardrobeItem, 'id' | 'createdAt'>;

@Injectable({
  providedIn: 'root'
})
export class WardrobeStorageService {
  private STORAGE_KEY = 'wardrobe_items';

  constructor() { }

  getItems(): WardrobeItem[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addItem(item: WardrobeItemInput): WardrobeItem {
    const items = this.getItems();
    const newItem: WardrobeItem = {
      ...item,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    items.push(newItem);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    return newItem;
  }

  deleteItem(id: number) {
    const items = this.getItems().filter(item => item.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }
}

