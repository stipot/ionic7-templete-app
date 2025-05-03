import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ScilinkComponent } from './scilink.component';

describe('ScilinkComponent', () => {
  let component: ScilinkComponent;
  let fixture: ComponentFixture<ScilinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot(), 
        ScilinkComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScilinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
