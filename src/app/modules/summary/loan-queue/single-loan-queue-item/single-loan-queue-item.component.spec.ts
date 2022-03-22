import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLoanQueueItemComponent } from './single-loan-queue-item.component';

describe('SingleLoanQueueItemComponent', () => {
  let component: SingleLoanQueueItemComponent;
  let fixture: ComponentFixture<SingleLoanQueueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleLoanQueueItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLoanQueueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
