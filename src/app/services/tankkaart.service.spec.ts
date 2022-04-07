import { TestBed } from '@angular/core/testing';

import { TankkaartService } from './tankkaart.service';

describe('TankkaartService', () => {
  let service: TankkaartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TankkaartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
