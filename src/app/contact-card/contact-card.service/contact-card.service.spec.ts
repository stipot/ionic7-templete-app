import { TestBed } from '@angular/core/testing';

import { ContactCardService } from './contact-card.service';

describe('ContactCardService', () => {
  let service: ContactCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
