import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-wardrobe-item-modal',
  templateUrl: './add-wardrobe-item-modal.component.html',
  styleUrls: ['./add-wardrobe-item-modal.component.scss']
})
export class AddWardrobeItemModalComponent {
  form: any = {
    name: '',
    type: '',
    season: '',
    size: '',
    photo: ''
  };

  seasons = ['Лето', 'Осень', 'Зима', 'Весна', 'Всесезон'];
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  constructor(private modalController: ModalController) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  confirm() {
    if (!this.form.name || !this.form.type || !this.form.season || !this.form.size) {
      alert('Заполните все поля!');
      return;
    }
    this.modalController.dismiss(this.form);
  }
}

