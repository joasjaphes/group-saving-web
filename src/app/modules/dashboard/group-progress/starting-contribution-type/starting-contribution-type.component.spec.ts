import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingContributionTypeComponent } from './starting-contribution-type.component';

describe('StartingContributionTypeComponent', () => {
  let component: StartingContributionTypeComponent;
  let fixture: ComponentFixture<StartingContributionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingContributionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingContributionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
