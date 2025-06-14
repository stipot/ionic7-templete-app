import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { ListenDecorator } from 'ionicons/dist/types/stencil-public-runtime';
import { HttpClient } from '@angular/common/http';
import { IonInput, ItemReorderEventDetail } from '@ionic/angular';

interface Note {
  id: string,
  name: string,
  isActive: boolean,
  order: number
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  @ViewChild('autofocus', {static: false}) inputBox?: IonInput
  data: Note[] = []

  name: string = ""

  activeNote: Note = {id: "", name: "", isActive: false, order: 0}
  private readonly STORAGE_KEY = 'notes_app_data'
  private readonly ORDER_STEP = 1

  constructor(protected http: HttpClient, private db: UserService, private cdRef: ChangeDetectorRef) {
    this.downloadData()
  }

  ngOnInit() {
    this.loadNotes()
  }

  private loadNotes() {
    const savedData = localStorage.getItem(this.STORAGE_KEY)
    if (savedData) {
      this.data = [...JSON.parse(savedData)]
      this.sortData()
      this.cdRef.detectChanges()
    }
  }

  trackByFn(index: number, note: Note): string {
    return note.id;
  }

  private sortData() {
    this.data = [...this.data].sort((a, b) => a.order - b.order)
  }

  private async downloadData() {
    // Загрузка данных
    // Сохранение порядка при загрузке:
    // let tmp = await this.db.getData(this.COLLECTION)
    // this.data = tmp.items.map((el: any) => ({
    //   name: el.name,
    //   isActive: el.isActive,
    //   order: el.order || 0
    // })).sort((a: Note, b: Note) => a.order - b.order)
  }

  private saveNotes() {
    this.sortData()
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data))
    this.cdRef.detectChanges()
  }

  ionViewWillEnter() {
    this.inputBox?.setFocus()
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const newData = [...this.data]
    const movedItem = newData.splice(ev.detail.from, 1)[0]
    newData.splice(ev.detail.to, 0, movedItem)
    
    this.data = newData // Заменяем массив полностью
    this.updateOrders()
    ev.detail.complete()
  }

  private updateOrders() {
    // Простая перенумерация с фиксированным шагом
    this.data.forEach((note, index) => {
      note.order = (index + 1) * this.ORDER_STEP
    })
    this.saveNotes()
  }

  public noteCompleted(e:Event) {
    // console.log(e)
  }

  public onClick(note: Note) {
    console.log('Click !!!', note)

    this.name = note.name
    this.activeNote = note
  }

  public onChange() {
    console.log("Changed")

    this.activeNote.name = this.name
    this.saveNotes()
  }

  public deleteItem(note: Note) {
    console.log("Delete: ", note)
    this.data = this.data.filter(item => item.id !== note.id);
    this.saveNotes()
  }

  public deleteAllCompletedItems() {
    this.data = this.data.filter((item) => item.isActive == false)
    this.saveNotes()
  }

  public enterEvent() {
    this.createNote()
  }

  private createNewNote(): Note {
    this.saveNotes()
    return {
      id: '',
      name: '',
      isActive: false,
      order: 0
    }
  }

  public createNote(){
    this.inputBox?.setFocus();

    if (this.name.trim() !== "") {
      const newNote: Note = {
        id: Date.now().toString(),
        name: this.name.trim(),
        isActive: false,
        order: this.getNextOrder()
      };
      
      // Создаем новый массив вместо push()
      this.data = [...this.data, newNote]
      this.saveNotes()
      this.name = ""
      this.activeNote = this.createNewNote()
    }
  }

  private getNextOrder(): number {
    if (this.data.length === 0) return this.ORDER_STEP
    
    this.sortData()
    return this.data[this.data.length - 1].order + this.ORDER_STEP
  }
}
