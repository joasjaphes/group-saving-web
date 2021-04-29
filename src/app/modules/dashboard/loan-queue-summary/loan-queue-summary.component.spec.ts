import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanQueueSummaryComponent } from './loan-queue-summary.component';

describe('LoanQueueSummaryComponent', () => {
  let component: LoanQueueSummaryComponent;
  let fixture: ComponentFixture<LoanQueueSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanQueueSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanQueueSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
