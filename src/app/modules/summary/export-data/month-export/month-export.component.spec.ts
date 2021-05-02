import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthExportComponent } from './month-export.component';

describe('MonthExportComponent', () => {
  let component: MonthExportComponent;
  let fixture: ComponentFixture<MonthExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
