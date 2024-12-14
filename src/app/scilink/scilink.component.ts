import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {DataService} from "./data.service"


interface Article {
  doi: string
  a_name: string
  a_authors: string
  abstract: string
  img_name: string
}

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-scilink',
  templateUrl: './scilink.component.html',
  styleUrls: ['./scilink.component.scss'],
})
export class ScilinkComponent implements OnInit {
  articles_cards: Article[] = []
  constructor(private http: HttpClient, private data: DataService) {}

  ngOnInit() {
    this.data.getData().subscribe((response: any) => {
      this.articles_cards = response
      console.log(this.articles_cards)
    });
    }
    search_btn(){

    }


}