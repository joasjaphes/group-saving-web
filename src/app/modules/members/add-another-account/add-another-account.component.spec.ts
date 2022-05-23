import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnotherAccountComponent } from './add-another-account.component';

describe('AddAnotherAccountComponent', () => {
  let component: AddAnotherAccountComponent;
  let fixture: ComponentFixture<AddAnotherAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnotherAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnotherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
