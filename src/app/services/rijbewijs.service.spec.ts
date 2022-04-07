import { TestBed } from '@angular/core/testing';

import { RijbewijsService } from './rijbewijs.service';

describe('RijbewijsService', () => {
  let service: RijbewijsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RijbewijsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
