import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestSettingComponent } from './loan-request-setting.component';

describe('LoanRequestSettingComponent', () => {
  let component: LoanRequestSettingComponent;
  let fixture: ComponentFixture<LoanRequestSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanRequestSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRequestSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
