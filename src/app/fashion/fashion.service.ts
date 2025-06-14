import { Injectable } from '@angular/core';
import { Dress } from './fashion.model';
import { HttpClient } from '@angular/common/http';
import { Observable, observeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FashionService {


  constructor(public http: HttpClient) {}

  getData(): Observable<Dress[]> {
    return this.http.get<Dress[]>('./assets/sample-data/fashion/fashion-data.json');
  }
}
