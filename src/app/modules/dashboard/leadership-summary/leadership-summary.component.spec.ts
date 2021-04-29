import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadershipSummaryComponent } from './leadership-summary.component';

describe('LeadershipSummaryComponent', () => {
  let component: LeadershipSummaryComponent;
  let fixture: ComponentFixture<LeadershipSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadershipSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadershipSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
