import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankkaartDetailComponent } from './tankkaart-detail.component';

describe('TankkaartDetailComponent', () => {
  let component: TankkaartDetailComponent;
  let fixture: ComponentFixture<TankkaartDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankkaartDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankkaartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
