import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RssDataComponent } from './rss-data.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('RssDataComponent', () => {
  let component: RssDataComponent;
  let fixture: ComponentFixture<RssDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RssDataComponent ],
      imports: [ HttpClientTestingModule,  TranslateModule.forRoot() ]
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
