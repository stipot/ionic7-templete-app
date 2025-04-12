import { Component, OnInit } from '@angular/core';

interface SubTask {
  id: number;
  text: string;
  style: 'normal' | 'underline' | 'strikethrough';
}

interface Task {
  id: number;
  title: string;
  subTasks: SubTask[];
  createdDate: Date;
}

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss']
})
export class TodoTaskComponent implements OnInit {
  public tasks: Task[] = [
    {
      id: 1,
      title: '',
      subTasks: [],
      createdDate: new Date('2024-03-01')
    }
  ];
  nextId: number = 2;

  constructor() {}

  ngOnInit(): void {}

  addTask(): void {
    const newTask: Task = {
      id: this.nextId++,
      title: '',
      subTasks: [],
      createdDate: new Date()
    };
    this.tasks.push(newTask);
  }

  addSubTask(): void {
    if (this.tasks.length > 0) {
      const lastTask = this.tasks[this.tasks.length - 1];
      const newSubTask: SubTask = {
        id: lastTask.subTasks.length + 1,
        text: '',
        style: 'normal'
      };
      lastTask.subTasks.push(newSubTask);
    }
  }

  
  // deleteTask(index: number) {
  //   this.tasks.splice(index, 1);
  // }

  // deleteSubTask(taskIndex: number, subtaskIndex: number) {
  //   this.tasks[taskIndex].subTasks.splice(subtaskIndex, 1);
  // }

  changeStyle(subTask: SubTask): void {
    switch (subTask.style) {
      case 'normal':
        subTask.style = 'underline';
        break;
      case 'underline':
        subTask.style = 'strikethrough';
        break;
      case 'strikethrough':
        subTask.style = 'normal';
        break;
    }
  }

  getDecoration(style: 'normal' | 'underline' | 'strikethrough'): string {
    switch (style) {
      case 'underline':
        return 'underline';
      case 'strikethrough':
        return 'line-through';
      default:
        return 'none';
    }
  }
}
