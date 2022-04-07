import { TestBed } from '@angular/core/testing';

import { GebruikerService } from './gebruiker.service';

describe('GebruikerService', () => {
  let service: GebruikerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GebruikerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
