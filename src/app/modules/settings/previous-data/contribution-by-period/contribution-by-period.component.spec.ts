import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionByPeriodComponent } from './contribution-by-period.component';

describe('ContributionByPeriodComponent', () => {
  let component: ContributionByPeriodComponent;
  let fixture: ComponentFixture<ContributionByPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionByPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionByPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
