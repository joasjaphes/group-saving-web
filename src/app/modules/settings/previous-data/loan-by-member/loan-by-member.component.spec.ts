import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanByMemberComponent } from './loan-by-member.component';

describe('LoanByMemberComponent', () => {
  let component: LoanByMemberComponent;
  let fixture: ComponentFixture<LoanByMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanByMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanByMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
