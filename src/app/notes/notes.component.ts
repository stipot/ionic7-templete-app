import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  noteData = '';
  notes: any = [];

  constructor(private userService: UserService) {
    this.userService.getData('notes').subscribe((res) => {
      this.notes.length = 0;
      res.map((element: any) => {
        this.notes.push(element);
      });
    });
  }

  saveData() {
    if (this.noteData) {
      this.userService.addData('notes', this.noteData);
      this.noteData = '';
    }
  }
  // Для изменения поля нужно ввести в главный инпут новые данные и нажать кнопку edit
  updateDocument(id: string) {
    if (this.noteData) {
      this.userService.updateDocument('notes', id, this.noteData);
      this.noteData = '';
    }
  }

  removeDocument(id: string) {
    this.userService.removeDocument('notes', id);
  }

  ngOnInit() {}
}
