import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GoalService } from '../../services/goal.service';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin); 

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  waterChart: any;
  last7DaysData: { date: string; amount: number }[] = [];
  dailyGoal: number = 2000;

  constructor(private goalService: GoalService) {}

  async ngOnInit() {
    this.goalService.last7DaysData$.subscribe((data) => {
      this.last7DaysData = data;
      if (this.waterChart) {
        this.updateChart();
      }
    });
  
    this.goalService.dailyGoal$.subscribe((goal) => {
      this.dailyGoal = goal ?? 2000;
      if (this.waterChart) {
        this.updateBarColors();
        this.updateGoalLine();
      }
    });
  
    await this.goalService.updateLast7DaysData();
    this.createChart();
  }
  
  async generateLast7DaysData() {
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
  
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
      });
  
      const waterAmount = await this.goalService.fetchWaterAmount(date.toISOString().split('T')[0]);
  
      this.last7DaysData.push({ date: formattedDate, amount: waterAmount || 0 });
    }
  
    console.log('Данные за последние 7 дней:', this.last7DaysData);
  }  

  async getWaterFromDatabase(date: Date): Promise<number> {
    const dateKey = date.toISOString().split('T')[0];
    const waterAmount = await this.goalService.fetchWaterAmount(dateKey);
    return waterAmount || 0;
  }

  createChart() {
    const labels = this.last7DaysData.map((data) => data.date);
    const data = this.last7DaysData.map((data) => data.amount);
  
    const maxWater = Math.max(...data);
    const maxYAxis = Math.max(maxWater, this.dailyGoal);
  
    this.waterChart = new Chart('waterChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Выпито воды (мл)',
            data: data,
            backgroundColor: this.last7DaysData.map((data) =>
              data.amount >= this.dailyGoal ? '#28a745' : '#3880ff'
            ),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: maxYAxis,
          },
        },
        plugins: {
          annotation: {
            annotations: {
              goalLine: {
                type: 'line',
                yMin: this.dailyGoal,
                yMax: this.dailyGoal,
                borderColor: 'rgba(255, 99, 132, 0.8)',
                borderWidth: 2,
                label: {
                  display: true,
                  content: 'Цель (мл)',
                  position: 'end',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  color: '#FF6384',
                },
              },
            },
          },
        },
      },
    });
  }

  updateGoalLine() {
    if (!this.waterChart) return;
  
    const data = this.last7DaysData.map((data) => data.amount);
    const maxWater = Math.max(...data);
    const maxYAxis = Math.max(maxWater, this.dailyGoal);
  
    this.waterChart.options.scales.y.max = maxYAxis;
  
    const goalLine = this.waterChart.options.plugins.annotation?.annotations?.goalLine;
    if (goalLine) {
      goalLine.yMin = this.dailyGoal;
      goalLine.yMax = this.dailyGoal;
    }
  
    this.waterChart.update();
  }  

  updateBarColors() {
    if (!this.waterChart) {
      console.error('График не найден!');
      return;
    }
  
    const dataset = this.waterChart.data.datasets[0];
    dataset.backgroundColor = this.last7DaysData.map((data) =>
      data.amount >= this.dailyGoal ? '#28a745' : '#3880ff'
    );
  }
  
  updateChart() {
    if (!this.waterChart) {
      console.error('График не найден!');
      return;
    }
  
    const labels = this.last7DaysData.map((data) => data.date);
    const values = this.last7DaysData.map((data) => data.amount);
  
    this.waterChart.data.labels = labels;
    this.waterChart.data.datasets[0].data = values;
  
    this.updateBarColors();
  
    this.waterChart.update();
  }  
}