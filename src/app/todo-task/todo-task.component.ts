import { Component, Renderer2 } from '@angular/core';

interface Task {
  id: number;
  content: string;
  styleIndex: number;
  subtasks: Subtask[];
}

interface Subtask {
  id: string;
  content: string;
  styleIndex: number;
}

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss']
})
export class TodoTaskComponent {
  tasks: Task[] = [];
  taskCounter = 0;
  textStyles = ['normal', 'underline', 'line-through'];

  constructor(private renderer: Renderer2) {}

  private generateTaskId(): number {
    return ++this.taskCounter;
  }

  private generateSubtaskId(taskId: number): string {
    return `${taskId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  addMainTask() {
    const newTask: Task = {
      id: this.generateTaskId(),
      content: '',
      styleIndex: 0,
      subtasks: []
    };
    this.tasks.push(newTask);
  }

  addSubtask() {
    if (this.tasks.length > 0) {
      const lastTask = this.tasks[this.tasks.length - 1];
      lastTask.subtasks.push({
        id: this.generateSubtaskId(lastTask.id),
        content: '',
        styleIndex: 0
      });
    }
  }

  removeLastTask() {
    if (this.tasks.length > 0) {
      this.tasks.pop();
    }
  }

  removeLastSubtask() {
    if (this.tasks.length > 0) {
      const lastTask = this.tasks[this.tasks.length - 1];
      if (lastTask.subtasks.length > 0) {
        lastTask.subtasks.pop();
      }
    }
  }

  handleTaskClick(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.styleIndex = (task.styleIndex + 1) % this.textStyles.length;
      this.updateTaskStyle(taskId);
    }
  }

  handleSubtaskClick(taskId: number, subtaskId: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const subtask = task.subtasks.find(s => s.id === subtaskId);
      if (subtask) {
        subtask.styleIndex = (subtask.styleIndex + 1) % this.textStyles.length;
        this.updateSubtaskStyle(taskId, subtaskId);
      }
    }
  }

  private updateTaskStyle(taskId: number) {
    const taskElement = document.querySelector(`#task-${taskId} textarea`);
    if (taskElement) {
      const task = this.tasks.find(t => t.id === taskId);
      const style = this.textStyles[task?.styleIndex ?? 0];

      this.renderer.removeStyle(taskElement, 'text-decoration');
      if (style !== 'normal') {
        this.renderer.setStyle(taskElement, 'text-decoration', style);
      }
    }
  }

  private updateSubtaskStyle(taskId: number, subtaskId: string) {
    const subtaskElement = document.querySelector(`#subtask-${taskId}-${subtaskId} textarea`);
    if (subtaskElement) {
      const task = this.tasks.find(t => t.id === taskId);
      const subtask = task?.subtasks.find(s => s.id === subtaskId);
      const style = this.textStyles[subtask?.styleIndex ?? 0];

      this.renderer.removeStyle(subtaskElement, 'text-decoration');
      if (style !== 'normal') {
        this.renderer.setStyle(subtaskElement, 'text-decoration', style);
      }
    }
  }
}
