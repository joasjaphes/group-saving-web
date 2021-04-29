import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingContributionSummaryComponent } from './upcoming-contribution-summary.component';

describe('UpcommingContributionSummaryComponent', () => {
  let component: UpcomingContributionSummaryComponent;
  let fixture: ComponentFixture<UpcomingContributionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingContributionSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingContributionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
