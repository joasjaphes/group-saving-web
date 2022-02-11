import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpectedFinesComponent } from './list-expected-fines.component';

describe('ListExpectedFinesComponent', () => {
  let component: ListExpectedFinesComponent;
  let fixture: ComponentFixture<ListExpectedFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExpectedFinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExpectedFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
