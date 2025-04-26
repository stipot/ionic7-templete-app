import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { FrontLayoutComponent } from './front-layout.component';
import { TranslateModule } from '@ngx-translate/core';

describe('FrontLayoutComponent', () => {
  let component: FrontLayoutComponent;
  let fixture: ComponentFixture<FrontLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontLayoutComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        TranslateModule.forRoot()
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(FrontLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
