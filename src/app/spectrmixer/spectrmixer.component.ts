import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface DatasetItem {
  name: string;
  data: number[];
  wavelengths: number[];
  power: number;
  count: number;
  isGaussian: boolean;
  peak?: number;
}

@Component({
  selector: 'app-spectrmixer',
  templateUrl: './spectrmixer.component.html',
  styleUrls: ['./spectrmixer.component.scss'],
})
export class SpectrmixerComponent {
  @ViewChild('chartCanvas', { static: false }) chartCanvas?: ElementRef<HTMLCanvasElement>;

  datasets: DatasetItem[] = [];
  combinedSpectrum: number[] = [];
  wavelengths: number[] = [];
  chart: Chart | null = null;
  newPeakWavelength = 660;
  newPower = 1;
  newCount = 1;

  private integrateTrapezoid(y: number[], x: number[]): number {
    let area = 0;
    for (let i = 0; i < y.length - 1; i++) {
      const dx = x[i + 1] - x[i];
      area += 0.5 * (y[i] + y[i + 1]) * dx;
    }
    return area;
  }

  addGaussianDataset() {
    const mu = this.newPeakWavelength;
    const sigma = 10;
    const wavelengths: number[] = [];
    const intensities: number[] = [];
    for (let wl = 380; wl <= 780; wl += 5) {
      wavelengths.push(wl);
      const intensity = Math.exp(-Math.pow(wl - mu, 2) / (2 * Math.pow(sigma, 2)));
      intensities.push(intensity);
    }

    const area = this.integrateTrapezoid(intensities, wavelengths);
    const normalized: number[] = intensities.map((value) => (area > 0 ? value / area : value));

    this.datasets.push({
      name: `Gaussian ${mu - 10}-${mu}-${mu + 10} nm`,
      data: normalized,
      wavelengths,
      power: this.newPower,
      count: this.newCount,
      isGaussian: true,
      peak: mu,
    });
    this.wavelengths = wavelengths;
  }

  removeDataset(index: number) {
    this.datasets.splice(index, 1);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || '';
      const parsed = this.parseCsv(text);
      if (!parsed.wavelengths.length) {
        return;
      }

      const area = this.integrateTrapezoid(parsed.intensities, parsed.wavelengths);
      const normalized = parsed.intensities.map((value) => (area > 0 ? value / area : value));

      this.datasets.push({
        name: file.name,
        data: normalized,
        wavelengths: parsed.wavelengths,
        power: 1,
        count: 1,
        isGaussian: false,
      });
      this.wavelengths = parsed.wavelengths;
    };
    reader.readAsText(file, 'UTF-8');
  }

  calculateCombinedSpectrum() {
    if (!this.datasets.length) {
      return;
    }
    this.combinedSpectrum = new Array(this.datasets[0].data.length).fill(0);
    for (const dataset of this.datasets) {
      for (let i = 0; i < dataset.data.length; i++) {
        this.combinedSpectrum[i] += dataset.data[i] * dataset.power * dataset.count;
      }
    }
    this.drawChart();
  }

  private drawChart() {
    if (!this.chartCanvas) {
      return;
    }
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.wavelengths,
        datasets: [
          {
            label: 'Combined Spectrum',
            data: this.combinedSpectrum,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Wavelength (nm)',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Normalized Intensity',
            },
          },
        },
      },
    });
  }

  private parseCsv(text: string) {
    const lines = text.split(/\r\n|\n/).filter((line) => line.trim().length > 0);
    const wavelengths: number[] = [];
    const intensities: number[] = [];
    let delimiter = ',';
    if (lines[0].includes(';')) {
      delimiter = ';';
    } else if (lines[0].includes('\t')) {
      delimiter = '\t';
    }
    for (const line of lines) {
      const parts = line.split(delimiter).map((part) => part.trim().replace(',', '.'));
      if (parts.length < 2) {
        continue;
      }
      const wl = Number(parts[0]);
      const intensity = Number(parts[1]);
      if (!Number.isFinite(wl) || !Number.isFinite(intensity)) {
        continue;
      }
      wavelengths.push(wl);
      intensities.push(intensity);
    }
    return { wavelengths, intensities };
  }
}
