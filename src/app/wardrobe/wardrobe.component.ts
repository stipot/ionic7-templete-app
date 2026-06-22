import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WardrobeStorageService, WardrobeItem } from './wardrobe-storage.service';
import { AddWardrobeItemModalComponent } from './add-wardrobe-item-modal.component';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss'],
})
export class WardrobeComponent implements OnInit {
  items: WardrobeItem[] = [];

  constructor(
    private modalController: ModalController,
    private storage: WardrobeStorageService
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  loadItems() {
    this.items = this.storage.getItems();
  }

  async openAddItemModal() {
    const modal = await this.modalController.create({
      component: AddWardrobeItemModalComponent
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {
      this.storage.addItem(result.data);
      this.loadItems();
    }
  }

  deleteItem(id: number) {
    if (confirm('Вы уверены?')) {
      this.storage.deleteItem(id);
      this.loadItems();
    }
  }

  trackByFn(index: number, item: WardrobeItem) {
    return item.id;
  }
}

