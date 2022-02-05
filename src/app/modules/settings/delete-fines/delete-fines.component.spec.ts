import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFinesComponent } from './delete-fines.component';

describe('DeleteFinesComponent', () => {
  let component: DeleteFinesComponent;
  let fixture: ComponentFixture<DeleteFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
