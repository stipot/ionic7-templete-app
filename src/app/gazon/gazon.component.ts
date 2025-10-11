import { Component } from '@angular/core';

@Component({
  selector: 'app-gazon',
  templateUrl: './gazon.component.html'
})
export class GazonComponent {
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }
}
