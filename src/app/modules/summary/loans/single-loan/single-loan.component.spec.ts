import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLoanComponent } from './single-loan.component';

describe('SingleLoanComponent', () => {
  let component: SingleLoanComponent;
  let fixture: ComponentFixture<SingleLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
