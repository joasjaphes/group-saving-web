import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisaPeriodComponent } from './hisa-period.component';

describe('HisaPeriodComponent', () => {
  let component: HisaPeriodComponent;
  let fixture: ComponentFixture<HisaPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HisaPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HisaPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
