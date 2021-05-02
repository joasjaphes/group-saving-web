import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanExportComponent } from './loan-export.component';

describe('LoanExportComponent', () => {
  let component: LoanExportComponent;
  let fixture: ComponentFixture<LoanExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
