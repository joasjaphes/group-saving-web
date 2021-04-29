import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionSummaryComponent } from './contribution-summary.component';

describe('ContributionSummaryComponent', () => {
  let component: ContributionSummaryComponent;
  let fixture: ComponentFixture<ContributionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
