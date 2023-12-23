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
      console.log(this.notes)
      this.notes.length = 0;
      res.map((element: any) => {
        this.notes.push(element);
      });
      console.log(this.notes);
    });
  }

  saveData() {
    if (this.noteData) {
      this.userService.addData(this.noteData, 'notes');
      this.noteData = '';
    }
    console.log(this.noteData);
  }

  ngOnInit() {}
}
