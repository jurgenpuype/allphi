import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestuurderComponent } from './bestuurder.component';

describe('BestuurderComponent', () => {
  let component: BestuurderComponent;
  let fixture: ComponentFixture<BestuurderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestuurderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestuurderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
