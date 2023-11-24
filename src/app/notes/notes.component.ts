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
    this.userService.getNotes().subscribe((res) => {
      this.notes.length = 0;
      res.map((element: any) => {
        this.notes.push(element);
      });
      console.log(this.notes);
    });
  }

  saveData() {
    if (this.noteData) {
      this.userService.addNote(this.noteData);
      this.noteData = '';
    }
    console.log(this.noteData);
  }

  ngOnInit() {}
}
