import { Component, OnInit } from '@angular/core';
import { ListenDecorator } from 'ionicons/dist/types/stencil-public-runtime';

interface Task {
  id: number,
  name: string,
  description: string
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent  implements OnInit {
  data: Task[] = [
    {id: 1, name: 'Добавить новую вкладку', description: "Использовать ionic framework"},
    {id: 2, name: 'Удалить сервис', description: "Добаить универсальный сервис"},
    {id: 3, name: 'Написать README.md', description: "Задокументировать проделанные шаги"},
  ]

  constructor() { }

  ngOnInit() {}

}
