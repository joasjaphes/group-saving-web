import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContributionComponent } from './import-contribution.component';

describe('ImportContributionComponent', () => {
  let component: ImportContributionComponent;
  let fixture: ComponentFixture<ImportContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
