import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SpeedometerComponent {
  downloadSpeed: number = 0;
  ping: number = 0;
  isTesting: boolean = false;

 
async measureDownloadSpeed(): Promise<number> {
  const url = 'https://speed.cloudflare.com/__down?bytes=5000000';

  const start = performance.now();

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const blob = await res.blob();

    const end = performance.now();

    const seconds = (end - start) / 1000;
    const mbps = (blob.size * 8) / seconds / 1024 / 1024;

    return Math.round(mbps);

  } catch (e) {
    console.error(e);
    return 0;
  }
}

async measurePing(): Promise<number> {
  const url = window.location.origin + '/favicon.ico';  
  const start = performance.now();
  
  try {
    await fetch(url, { method: 'HEAD', cache: 'no-store' });
    return Math.round(performance.now() - start);
  } catch (e) {
    return 0;
  }
}
  getSpeedColor(): string {
    if (this.downloadSpeed < 10) return '#e57373';
    if (this.downloadSpeed < 30) return '#ffb74d';
    if (this.downloadSpeed < 60) return '#ffd54f';
    return '#81c784';
  }

  getSpeedQuality(): string {
    if (this.downloadSpeed === 0) return 'Не измерено';
    if (this.downloadSpeed < 10) return 'Очень медленно';
    if (this.downloadSpeed < 30) return 'Нормально';
    if (this.downloadSpeed < 60) return 'Хорошо';
    return 'Отлично';
  }
async runFullTest() {
  this.isTesting = true;

  try {
    
    const results: number[] = [];

    for (let i = 0; i < 3; i++) {
      const speed = await this.measureDownloadSpeed();
      results.push(speed);
    }

    const sorted = results.sort((a, b) => a - b);
    sorted.shift();
    sorted.pop();

    this.downloadSpeed = Math.round(
      sorted.reduce((a, b) => a + b, 0) / sorted.length
    );

    
    const pingResults: number[] = [];
    for (let i = 0; i < 3; i++) {
      const ping = await this.measurePing();
      if (ping > 0) {
        pingResults.push(ping);
      }
    }
    
    if (pingResults.length > 0) {
      this.ping = Math.round(
        pingResults.reduce((a, b) => a + b, 0) / pingResults.length
      );
    } else {
      this.ping = 0;
    }
    

  } catch (e) {
    console.error(e);
    this.downloadSpeed = 0;
  } finally {
    this.isTesting = false;
  }
}
getAngle(): number {
  // От -90° (0 Мбит/с) до +90° (300 Мбит/с)
  const speed = Math.max(0, Math.min(this.downloadSpeed, 300));
  return (speed / 300) * 180 - 90;
}
getPingColor(): string {
  if (this.ping === 0) return 'var(--ion-color-medium)';
  if (this.ping < 20) return '#81c784';    
  if (this.ping < 50) return '#ffd54f';    
  if (this.ping < 100) return '#ffb74d';   
  return '#e57373';                        
}
}