import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseByPeriodComponent } from './expense-by-period.component';

describe('ExpenseByPeriodComponent', () => {
  let component: ExpenseByPeriodComponent;
  let fixture: ComponentFixture<ExpenseByPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseByPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseByPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
