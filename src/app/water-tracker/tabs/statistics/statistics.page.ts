import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss']
})
export class StatisticsPage implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('statisticsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [
          {
            label: 'Потребление воды (мл)',
            data: [800, 1200, 1000, 1500, 2000, 1800, 1700],
            backgroundColor: '#3dc2ff',
            borderColor: '#007bff',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
