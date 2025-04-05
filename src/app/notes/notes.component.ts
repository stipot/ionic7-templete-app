import { Component, OnInit } from '@angular/core';
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
  editingNoteId: string | null = null; 
  constructor(private userService: UserService, private translate: TranslateService) {
    // this.userService.getData('notes').subscribe((res) => {
    //   this.notes.length = 0;
    //   res.map((element: any) => {
    //     if ("id" in element) {
    //       this.notes.push(element);
    //     }
    //   });
    //   console.log(res);
    // });
  }

  ngOnInit() {
    // Component name
    this.translate.get('Notes').subscribe((translated: string) => {
      this.pageTitle = translated;
    });
    const storedNotes = localStorage.getItem('notes');
    this.notes = storedNotes ? JSON.parse(storedNotes) : [];
  }

  saveData() {
    if (this.noteData) {
      if (this.editingNoteId) {
        // this.userService.updateDocument('notes', this.editingNoteId, this.noteData);
        const index = this.notes.findIndex((note:any) => note.id === this.editingNoteId);
        if (index !== -1) {
          this.notes[index].data = this.noteData;
        }
        this.editingNoteId = null; 
      } else {
        // this.userService.addData('notes', this.noteData);
        const newNote = {
          id: Date.now().toString(),
          data: this.noteData,
        };
        this.notes.push(newNote);
      }
      localStorage.setItem('notes', JSON.stringify(this.notes));
      this.noteData = '';
    }
  }

  removeDocument(id: string) {
    // this.userService.removeDocument('notes', id);
    this.notes = this.notes.filter((note: any) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  setEditMode(data: string, id: string) {
    this.noteData = data; 
    this.editingNoteId = id; 
  }
}
