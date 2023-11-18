import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import {UserService } from '../user.service'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})

export class NotesComponent  implements OnInit {
// Получаем базу данных
   notes = []
  constructor(private userService: UserService) {    
    this.userService.getNotes().subscribe((res) => {
    // this.notes = res
    console.log(this.notes)
  });}
// Записываем данные из базы данных в переменную

  ngOnInit() {}

}
