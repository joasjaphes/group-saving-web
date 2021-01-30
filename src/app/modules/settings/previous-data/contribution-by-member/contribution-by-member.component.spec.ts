import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionByMemberComponent } from './contribution-by-member.component';

describe('ContributionByMemberComponent', () => {
  let component: ContributionByMemberComponent;
  let fixture: ComponentFixture<ContributionByMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionByMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionByMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
