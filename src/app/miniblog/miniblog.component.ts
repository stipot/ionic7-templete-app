import { Component, OnInit } from '@angular/core';

interface Blog {
  name: string
  chapter: string
  src: string
  text: string
}

@Component({
  selector: 'app-miniblog',
  templateUrl: './miniblog.component.html',
  styleUrls: ['./miniblog.component.scss'],
})
export class MiniblogComponent  implements OnInit {

  constructor() { }
  blogs: Blog[] =[
    {name: "Обзор Анаксы", chapter: "Игры", src: "https://www.goha.ru/s/A:CO/aO/xY8wmWZwYM.jpg", text: "В Honkai: Star Rail недавно вышел новый персонаж пути ветряной эрудиции. В этой статье расскажу о своих впечатлениях об этом персонаже."}
  ]
  ngOnInit() {}

}
