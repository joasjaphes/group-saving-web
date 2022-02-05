import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLoansComponent } from './delete-loans.component';

describe('DeleteLoansComponent', () => {
  let component: DeleteLoansComponent;
  let fixture: ComponentFixture<DeleteLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
