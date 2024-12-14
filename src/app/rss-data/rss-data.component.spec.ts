import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RssDataComponent } from './rss-data.component';

describe('RssDataComponent', () => {
  let component: RssDataComponent;
  let fixture: ComponentFixture<RssDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RssDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RssDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});