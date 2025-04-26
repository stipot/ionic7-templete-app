import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FashionService } from './fashion.service';

describe('FashionService', () => {
  let service: FashionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FashionService]
    });
    service = TestBed.inject(FashionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
