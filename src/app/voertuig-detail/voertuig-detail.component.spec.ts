import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoertuigDetailComponent } from './voertuig-detail.component';

describe('VoertuigDetailComponent', () => {
  let component: VoertuigDetailComponent;
  let fixture: ComponentFixture<VoertuigDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoertuigDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoertuigDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
