import { TestBed } from '@angular/core/testing';

import { BrandstofTankkaartService } from './brandstof-tankkaart.service';

describe('BrandstofTankkaartService', () => {
  let service: BrandstofTankkaartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandstofTankkaartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
