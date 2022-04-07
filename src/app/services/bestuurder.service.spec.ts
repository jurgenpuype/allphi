import { TestBed } from '@angular/core/testing';

import { BestuurderService } from './bestuurder.service';

describe('BestuurderService', () => {
  let service: BestuurderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestuurderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
