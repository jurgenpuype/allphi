import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoertuigComponent } from './voertuig.component';

describe('VoertuigComponent', () => {
  let component: VoertuigComponent;
  let fixture: ComponentFixture<VoertuigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoertuigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoertuigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
