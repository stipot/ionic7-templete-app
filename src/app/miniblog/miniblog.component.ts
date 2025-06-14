import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddBlogModalComponent } from './add-blog-modal.component';

interface Blog {
name: string;
chapter: string;
src: string;
text: string;
}

@Component({
  selector: 'app-miniblog',
  templateUrl: './miniblog.component.html',
  styleUrls: ['./miniblog.component.scss'],
})
export class MiniblogComponent{
  blogs: Blog[] = [
    {
      name: "Обзор Анаксы",
      chapter: "Игры",
      src: "https://www.goha.ru/s/A:CO/aO/xY8wmWZwYM.jpg",
      text: "В Honkai: Star Rail недавно вышел новый персонаж пути ветряной эрудиции. В этой статье расскажу о своих впечатлениях об этом персонаже.",
    },
    {
      name: "Yoasobi и не только. Песни которые стоит послушать в мае",
      chapter: "Музыка",
      src: "https://starrail.guru/wp-content/uploads/2024/07/feysyao-portret-971x546-optimized.png",
      text: "Вот наступил май. За это время весной вышло несколько ярких релизов. В этой статье будут преставлены топ песн для майских прогулок.",
    }
  ];

  constructor(private modalController: ModalController) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: AddBlogModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.blogs.push(result.data);
      }
    });

    return await modal.present();
  }
}
