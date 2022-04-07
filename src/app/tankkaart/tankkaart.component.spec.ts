import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankkaartComponent } from './tankkaart.component';

describe('TankkaartComponent', () => {
  let component: TankkaartComponent;
  let fixture: ComponentFixture<TankkaartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankkaartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankkaartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
