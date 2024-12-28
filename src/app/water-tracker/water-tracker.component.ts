import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GoalService } from './services/goal.service';
import { waterTrackerApp } from './firebase-config-water-tracker';

@Component({
  selector: 'app-water-tracker',
  templateUrl: './water-tracker.component.html',
  styleUrls: ['./water-tracker.component.scss'],
})

export class WaterTrackerComponent implements OnInit {
  dailyGoal: number = 0;

  constructor(
    private goalService: GoalService) {}

  async ngOnInit() {
    const auth = getAuth(waterTrackerApp);
    const user = auth.currentUser;

    if (user) {
      this.goalService.dailyGoal$.subscribe((goal) => {
        console.log("Updated goal in component:", goal);
        this.dailyGoal = goal ?? 2000;
      });

      await this.goalService.fetchDailyGoal(user.uid);
    }
  }
}
