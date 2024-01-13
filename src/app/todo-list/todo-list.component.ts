import { Component, OnInit, ViewChild } from '@angular/core';
import { ListenDecorator } from 'ionicons/dist/types/stencil-public-runtime';
import { HttpClient } from '@angular/common/http';
import { IonInput, ItemReorderEventDetail } from '@ionic/angular';

import { UserService } from '../user.service';

interface Task {
  name: string,
  description: string,
  isActive: boolean,
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent  implements OnInit {
  private readonly COLLECTION = "todo-list"
  private readonly URL = "assets/sample-data/tasks.json"
  
  @ViewChild('autofocus', {static: false}) inputBox?: IonInput;
  data: Task[] = []

  name: string = ""
  description: string = ""

  activeTask: Task = {name: "", description: "", isActive: false}


  constructor(protected http: HttpClient, private db: UserService) { 
      this.downloadData()
  }

  ngOnInit() {
  }

  private async downloadData() {
    console.log("Download")
    let tmp = await this.db.getData(this.COLLECTION)

    for(let el of tmp.items) {
      console.log('item:', el)
      let task: Task = {name: el.name, description: el.description, isActive: el.isActive}
      this.data.push(task)
    }
  }


  ionViewWillEnter() {
    this.inputBox?.setFocus()
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete()
  }


  public taskCompleted(e:Event) {
    // console.log(e)
  }

  public onClick(task: Task) {
    console.log('Click !!!', task)

    this.name = task.name
    this.description = task.description
    this.activeTask = task
  }

  public onChange() {
    console.log("Changed")

    this.activeTask.name = this.name
    this.activeTask.description = this.description
    
  }

  public deleteItem(task: Task) {
    console.log("Delete: ", task)
    let data = this.data.filter((item) => item != task)
    this.db.updateData(this.COLLECTION, data)
    this.data = data
  }

  public deleteAllCompletedItems() {
    this.data = this.data.filter((item) => item.isActive == false)
  }

  public enterEvent() {
    this.createTask()
  }

  public createTask(){
    this.inputBox?.setFocus()

    if (this.name != "") {
      let task: Task = {name: this.name, description: this.description, isActive: false}
      this.data.push(task)
      this.db.updateData(this.COLLECTION, this.data)


      this.name = ""
      this.description = ""
    }
  }

}
