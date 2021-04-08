import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionItemComponent } from './contribution-item.component';

describe('ContributionItemComponent', () => {
  let component: ContributionItemComponent;
  let fixture: ComponentFixture<ContributionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
