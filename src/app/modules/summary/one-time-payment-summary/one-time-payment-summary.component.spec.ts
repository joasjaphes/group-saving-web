import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimePaymentSummaryComponent } from './one-time-payment-summary.component';

describe('OneTimePaymentSummaryComponent', () => {
  let component: OneTimePaymentSummaryComponent;
  let fixture: ComponentFixture<OneTimePaymentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimePaymentSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimePaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
