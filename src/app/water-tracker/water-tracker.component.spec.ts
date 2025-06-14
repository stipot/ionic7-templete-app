import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { WaterTrackerComponent } from './water-tracker.component';

describe('WaterTrackerComponent', () => {
  let component: WaterTrackerComponent;
  let fixture: ComponentFixture<WaterTrackerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterTrackerComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(WaterTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
