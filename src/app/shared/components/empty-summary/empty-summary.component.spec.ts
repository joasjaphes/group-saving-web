import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySummaryComponent } from './empty-summary.component';

describe('EmptySummaryComponent', () => {
  let component: EmptySummaryComponent;
  let fixture: ComponentFixture<EmptySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
