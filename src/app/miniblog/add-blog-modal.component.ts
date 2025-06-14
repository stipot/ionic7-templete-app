
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-blog-modal',
  templateUrl: './add-blog-modal.component.html',
})
export class AddBlogModalComponent {
  blog = {
    name: '',
    chapter: '',
    src: '',
    text: '',
  };

  constructor(private modalController: ModalController) {}

  cancel() {
    this.modalController.dismiss();
  }

  confirm() {
    if (this.blog.name && this.blog.chapter && this.blog.text) {
      this.modalController.dismiss(this.blog);
    } else {
      alert('Пожалуйста, заполните обязательные поля.');
    }
  }
}
