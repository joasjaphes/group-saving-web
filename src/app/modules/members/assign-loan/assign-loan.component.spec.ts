import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLoanComponent } from './assign-loan.component';

describe('AssignLoanComponent', () => {
  let component: AssignLoanComponent;
  let fixture: ComponentFixture<AssignLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
