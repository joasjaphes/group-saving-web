import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanQueueComponent } from './loan-queue.component';

describe('LoanQueueComponent', () => {
  let component: LoanQueueComponent;
  let fixture: ComponentFixture<LoanQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
