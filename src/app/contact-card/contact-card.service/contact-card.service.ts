import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactCardService {

  constructor(private http: HttpClient) { }
  getData(){
    return this.http.get('/assets/sample-data/contact-card.json')
  }
}