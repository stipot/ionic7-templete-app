import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactCardService } from './contact-card.service';

describe('ContactCardService', () => {
  let service: ContactCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ContactCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
