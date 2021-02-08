import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanQueueComponent } from './add-loan-queue.component';

describe('AddLoanQueueComponent', () => {
  let component: AddLoanQueueComponent;
  let fixture: ComponentFixture<AddLoanQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
