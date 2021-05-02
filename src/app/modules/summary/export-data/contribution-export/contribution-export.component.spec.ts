import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionExportComponent } from './contribution-export.component';

describe('ContributionExportComponent', () => {
  let component: ContributionExportComponent;
  let fixture: ComponentFixture<ContributionExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
