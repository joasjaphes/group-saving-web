import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberEmailComponent } from './update-member-email.component';

describe('UpdateMemberEmailComponent', () => {
  let component: UpdateMemberEmailComponent;
  let fixture: ComponentFixture<UpdateMemberEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMemberEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMemberEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
