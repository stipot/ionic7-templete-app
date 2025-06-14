import { Component, OnInit } from '@angular/core';
import { FashionService } from './fashion.service';
import { Dress } from './fashion.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.scss'],
})

export class FashionComponent  implements OnInit {
    items: Dress[] = [];
      
  constructor(private fashionService: FashionService, private router: Router) {}
  

  ngOnInit(): void {this.fashionService.getData().subscribe((data: Dress[]) => { this.items = data; });
  }

  goToItem(item: Dress) { 
    this.router.navigate(['/fashion-detail'], {state: { item } });
  }
}
