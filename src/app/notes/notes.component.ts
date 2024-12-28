import { Component, OnInit } from '@angular/core'
import { UserService } from '../user.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  noteData = '';
  notes: any = [];
  editingNoteId: string | null = null; 
  constructor(private userService: UserService, private translate: TranslateService) {
    this.userService.getData('notes').subscribe((res) => {
      this.notes.length = 0;
      res.map((element: any) => {
        if ("id" in element) {
          this.notes.push(element);
        }
      });
      console.log(res);
    });
  }

  saveData() {
    if (this.noteData) {
      if (this.editingNoteId) {
        this.userService.updateDocument('notes', this.editingNoteId, this.noteData);
        this.editingNoteId = null; 
      } else {
        this.userService.addData('notes', this.noteData);
      }
      this.noteData = '';
    }
  }

  removeDocument(id: string) {
    this.userService.removeDocument('notes', id);
  }

  setEditMode(data: string, id: string) {
    this.noteData = data; 
    this.editingNoteId = id; 
  }

  ngOnInit() {}
}
