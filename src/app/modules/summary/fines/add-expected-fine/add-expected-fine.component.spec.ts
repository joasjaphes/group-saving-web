import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpectedFineComponent } from './add-expected-fine.component';

describe('AddExpectedFineComponent', () => {
  let component: AddExpectedFineComponent;
  let fixture: ComponentFixture<AddExpectedFineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpectedFineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpectedFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
