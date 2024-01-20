import { TestBed } from '@angular/core/testing';

import { FashionService } from './fashion.service';

describe('FashionService', () => {
  let service: FashionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
