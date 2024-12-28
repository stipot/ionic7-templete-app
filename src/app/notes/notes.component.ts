import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { UserService } from '../user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  noteData = '';
  pageTitle = "Notes"
  notes: any = [];

  constructor(private userService: UserService,  private translate: TranslateService) {
    this.userService.getData('notes').subscribe((res) => {
      this.notes.length = 0;
      res.map((element: any) => {
        if ("id" in element ){
          this.notes.push(element);
        }
      console.log(res);
      });
    });
  }

  ngOnInit() {
    // Component name
    this.translate.get('Notes').subscribe((translated: string) => {
      this.pageTitle = translated;
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

}
