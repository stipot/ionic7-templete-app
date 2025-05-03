import { Component, OnInit } from '@angular/core';
import { DataService, Product } from './data.service';
import { RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
})
export class DealsComponent implements OnInit {

  loc: any = {}
  date: Date = new Date();
  formattedDate = this.date.toLocaleString();

  public openLink(url: string) {
    window.open(url, '_blank');
  }

  public searchText: string = '';
  public searchType: 'name' | 'checked' = 'name';
  public products: Product[] = [];

  constructor(private data: DataService) {}

  public product?: Product;

  public refresh(ev: any): void {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  public ngOnInit(): void {
    this.products = this.data.getProducts();
  }

  public getProducts(): Product[] {
    if (!this.searchText) {
      return this.products;
    }

    return this.products.filter(product => {
      if (this.searchType === 'name') {
        return product.name.toLowerCase().includes(this.searchText.toLowerCase());
      } else {
        return product.checked.toString().includes(this.searchText.toLowerCase());
      }
    });
  }

  public toggleSearchType(): void {
    this.searchType = this.searchType === 'name' ? 'checked' : 'name';
    this.searchText = '';
  }
}
