import { TestBed } from '@angular/core/testing';

import { BrandstofVoertuigService } from './brandstof-voertuig.service';

describe('BrandstofVoertuigService', () => {
  let service: BrandstofVoertuigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandstofVoertuigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
