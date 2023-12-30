import { Component, OnInit, ViewChild } from '@angular/core';
import { ListenDecorator } from 'ionicons/dist/types/stencil-public-runtime';
import { HttpClient } from '@angular/common/http';
import { IonInput, ItemReorderEventDetail } from '@ionic/angular';


interface Task {
  id: number,
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
  private readonly URL = "assets/sample-data/tasks.json"
  
  @ViewChild('autofocus', {static: false}) inputBox?: IonInput;
  data: Task[] = []

  name: string = ""
  description: string = ""

  activeTask: Task = {id: 0, name: "", description: "", isActive: false}


  constructor(protected http: HttpClient) { 
    this.http.get(this.URL)
      .subscribe((res: any) => {
        this.data = res;
      });

      
  }

  ngOnInit() {
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
    this.data = this.data.filter((item) => item != task)
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
      let task: Task = {id: 100, name: this.name, description: this.description, isActive: false}
      this.data.push(task)

      this.name = ""
      this.description = ""
    }
  }

}
