import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRssPage } from './login-rss.page';

describe('LoginRssPage', () => {
  let component: LoginRssPage;
  let fixture: ComponentFixture<LoginRssPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginRssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
