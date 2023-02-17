import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberPasswordComponent } from './update-member-password.component';

describe('UpdateMemberPasswordComponent', () => {
  let component: UpdateMemberPasswordComponent;
  let fixture: ComponentFixture<UpdateMemberPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMemberPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMemberPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
