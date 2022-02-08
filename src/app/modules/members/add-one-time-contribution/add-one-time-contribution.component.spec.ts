import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOneTimeContributionComponent } from './add-one-time-contribution.component';

describe('AddOneTimeContributionComponent', () => {
  let component: AddOneTimeContributionComponent;
  let fixture: ComponentFixture<AddOneTimeContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOneTimeContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOneTimeContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
