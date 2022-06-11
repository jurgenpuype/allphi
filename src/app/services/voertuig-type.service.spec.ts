import { TestBed } from '@angular/core/testing';

import { VoertuigTypeService } from './voertuig-type.service';

describe('VoertuigTypeService', () => {
  let service: VoertuigTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoertuigTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
