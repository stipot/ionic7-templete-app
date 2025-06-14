import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dress } from '../fashion/fashion.model';

@Component({
  selector: 'app-fashion-detail',
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.scss'],
})
export class FashionDetailComponent implements OnInit {
  item: Dress | undefined;

  constructor(private router: Router) {
    this.item = this.router.getCurrentNavigation()?.extras.state?.['item'];
  }

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['/fashion']);
  }
}