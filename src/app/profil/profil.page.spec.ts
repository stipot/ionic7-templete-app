import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilPage } from './profil.page';

describe('ProfilPage', () => {
  let component: ProfilPage;
  let fixture: ComponentFixture<ProfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
