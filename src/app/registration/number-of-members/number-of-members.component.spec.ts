import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfMembersComponent } from './number-of-members.component';

describe('NumberOfMembersComponent', () => {
  let component: NumberOfMembersComponent;
  let fixture: ComponentFixture<NumberOfMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
