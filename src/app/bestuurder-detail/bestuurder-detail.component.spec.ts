import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestuurderDetailComponent } from './bestuurder-detail.component';

describe('BestuurderDetailComponent', () => {
  let component: BestuurderDetailComponent;
  let fixture: ComponentFixture<BestuurderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestuurderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestuurderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
