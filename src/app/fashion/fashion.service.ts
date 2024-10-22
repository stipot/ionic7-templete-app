import { Injectable } from '@angular/core';
import { Dress } from './fashion.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FashionService {

  products: Dress[] = [];

  constructor(public http: HttpClient) { }

  ngOnIt() {
    
  }

  getData(): any {
    return this.http.get<Dress>('./assets/sample-data/fashion/fashion-data.json');
  }
}
