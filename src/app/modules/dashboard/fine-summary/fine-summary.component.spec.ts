import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineSummaryComponent } from './fine-summary.component';

describe('FineSummaryComponent', () => {
  let component: FineSummaryComponent;
  let fixture: ComponentFixture<FineSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FineSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FineSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
