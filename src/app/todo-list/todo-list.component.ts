import { Component, OnInit } from '@angular/core';
import { ListenDecorator } from 'ionicons/dist/types/stencil-public-runtime';
import { HttpClient } from '@angular/common/http';


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
  data: Task[] = []

  name: string = ""
  description: string = ""

  

  constructor(protected http: HttpClient) { 
    this.http.get(this.URL)
      .subscribe((res: any) => {
        this.data = res;
      });
  }

  ngOnInit() {

  }

  getData() {
   return this.http.get<Task>(this.URL);
  }

  public taskCompleted(e:Event) {
    console.log(e)
  }

  public createTask(){
    if (this.name != "") {
      let task: Task = {id: 100, name: this.name, description: this.description, isActive: false}
      this.data.push(task)

      this.name = ""
      this.description = ""
    }
  }

}
