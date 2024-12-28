import { Component } from '@angular/core';

interface Task {
  text: string;
  isEditing?: boolean; // Флаг для редактирования
}

interface Column {
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent {
  pageTitle: string = "Kanban"
  columns: Column[] = [
    {
      title: 'To Do',
      tasks: [{ text: 'First Task' }, { text: 'Second Task' }],
    },
    {
      title: 'In Progress',
      tasks: [{ text: 'Work on Kanban' }],
    },
    {
      title: 'Done',
      tasks: [{ text: 'Complete the project' }],
    },
  ];

  // Начать редактирование задачи
  editTask(task: Task) {
    this.stopEditing(); // Убедимся, что другая задача не редактируется
    task.isEditing = true;
  }

  // Остановить редактирование задачи
  stopEditing(task?: Task) {
    if (task) {
      task.isEditing = false;
    } else {
      // Убедимся, что все задачи выходят из режима редактирования
      this.columns.forEach((column) =>
        column.tasks.forEach((task) => (task.isEditing = false))
      );
    }
  }

  // Добавление задачи
  addTask(column: Column) {
    column.tasks.push({ text: 'New Task' });
  }

  // Обработка перетаскивания
  onDragStart(event: any, task: Task) {
    event.dataTransfer.setData('text', task.text); // Сохраняем текст задачи в переносимом объекте
  }

  onDrop(event: any, column: Column) {
    const taskText = event.dataTransfer.getData('text'); // Получаем текст задачи
    let task: Task | undefined = undefined;

    // Находим задачу по тексту в столбцах
    this.columns.forEach((col) => {
      col.tasks.forEach((t) => {
        if (t.text === taskText) {
          task = t;
        }
      });
    });

    if (task) {
      // Удаляем задачу из текущей колонки и добавляем в новую
      this.columns.forEach((col) => {
        const index = col.tasks.indexOf(task!);
        if (index > -1) {
          col.tasks.splice(index, 1); // Удаляем задачу из текущей колонки
        }
      });

      column.tasks.push(task); // Добавляем задачу в новую колонку
    }
  }
}
