import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationsPage } from './validations.page';

describe('ValidationsPage', () => {
  let component: ValidationsPage;
  let fixture: ComponentFixture<ValidationsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ValidationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
