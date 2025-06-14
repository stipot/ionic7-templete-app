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
    text: ''
  };

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.blog, 'confirm');
  }
}