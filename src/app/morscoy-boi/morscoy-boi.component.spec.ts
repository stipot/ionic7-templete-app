import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MorscoyBoiComponent } from './morscoy-boi.component';

describe('MorscoyBoiComponent', () => {
  let component: MorscoyBoiComponent;
  let fixture: ComponentFixture<MorscoyBoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MorscoyBoiComponent],
      imports: [IonicModule] // 
    }).compileComponents();

    fixture = TestBed.createComponent(MorscoyBoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});