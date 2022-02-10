import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimePaymentItemComponent } from './one-time-payment-item.component';

describe('OneTimePaymentItemComponent', () => {
  let component: OneTimePaymentItemComponent;
  let fixture: ComponentFixture<OneTimePaymentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimePaymentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimePaymentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
