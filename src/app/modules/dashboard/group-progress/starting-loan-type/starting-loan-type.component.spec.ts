import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingLoanTypeComponent } from './starting-loan-type.component';

describe('StartingLoanTypeComponent', () => {
  let component: StartingLoanTypeComponent;
  let fixture: ComponentFixture<StartingLoanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingLoanTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingLoanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
