import { TestBed } from '@angular/core/testing';

import { VoertuigService } from './voertuig.service';

describe('VoertuigService', () => {
  let service: VoertuigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoertuigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
