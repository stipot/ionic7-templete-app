import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  obj: Object;
  constructor(private http: HttpClient) {
    this.obj = this.http.get('/assets/sample-data/prices/data.ts')
   }

  // getData(){
  //   return this.http.get('/assets/sample-data/prices/data.json')
  // }
}