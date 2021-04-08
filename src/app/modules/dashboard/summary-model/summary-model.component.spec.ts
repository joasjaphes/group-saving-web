import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryModelComponent } from './summary-model.component';

describe('SummaryModelComponent', () => {
  let component: SummaryModelComponent;
  let fixture: ComponentFixture<SummaryModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
