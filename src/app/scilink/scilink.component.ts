import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';



@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-scilink',
  templateUrl: './scilink.component.html',
  styleUrls: ['./scilink.component.scss'],
})
export class ScilinkComponent implements OnInit {
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }


}