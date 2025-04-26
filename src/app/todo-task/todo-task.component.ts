import { Component, Renderer2 } from '@angular/core';

interface Task {
  id: number;
  content: string;
  subtasks: Subtask[];
  styleIndex?: number
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
      subtasks: []
    };
    this.tasks.push(newTask);
  }

  addSubtask() {
    if (this.tasks.length > 0) {
      const lastTask = this.tasks[this.tasks.length - 1];
      const newSubtask: Subtask = {
        id: this.generateSubtaskId(lastTask.id),
        content: '',
        styleIndex: 0
      };
      lastTask.subtasks.push(newSubtask);
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

  private updateSubtaskStyle(taskId: number, subtaskId: string) {
    const textarea = document.querySelector(`#subtask-${taskId}-${subtaskId} textarea`);
    if (textarea) {
      this.renderer.removeStyle(textarea, 'text-decoration');
      
      const task = this.tasks.find(t => t.id === taskId);
      const style = this.textStyles[task?.subtasks.find(s => s.id === subtaskId)?.styleIndex ?? 0];
      
      if (style !== 'normal') {
        this.renderer.setStyle(textarea, 'text-decoration', style);
      }
    }
  }
}
