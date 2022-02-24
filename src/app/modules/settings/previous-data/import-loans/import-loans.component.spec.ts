import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLoansComponent } from './import-loans.component';

describe('ImportLoansComponent', () => {
  let component: ImportLoansComponent;
  let fixture: ComponentFixture<ImportLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
