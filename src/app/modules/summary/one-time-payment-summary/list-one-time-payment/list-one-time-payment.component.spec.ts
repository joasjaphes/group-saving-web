import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOneTimePaymentComponent } from './list-one-time-payment.component';

describe('ListOneTimeContributionsComponent', () => {
  let component: ListOneTimePaymentComponent;
  let fixture: ComponentFixture<ListOneTimePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOneTimePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOneTimePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
