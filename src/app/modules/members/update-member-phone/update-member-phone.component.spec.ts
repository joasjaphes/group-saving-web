import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberPhoneComponent } from './update-member-phone.component';

describe('UpdateMemberPhoneComponent', () => {
  let component: UpdateMemberPhoneComponent;
  let fixture: ComponentFixture<UpdateMemberPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMemberPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMemberPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
