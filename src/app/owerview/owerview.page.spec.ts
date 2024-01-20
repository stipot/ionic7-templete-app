import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OwerviewPage } from './owerview.page';

describe('OwerviewPage', () => {
  let component: OwerviewPage;
  let fixture: ComponentFixture<OwerviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OwerviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
