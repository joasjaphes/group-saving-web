import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinesComponent } from './list-fines.component';

describe('ListFinesComponent', () => {
  let component: ListFinesComponent;
  let fixture: ComponentFixture<ListFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
