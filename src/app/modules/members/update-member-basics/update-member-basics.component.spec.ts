import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberBasicsComponent } from './update-member-basics.component';

describe('UpdateMemberBasicsComponent', () => {
  let component: UpdateMemberBasicsComponent;
  let fixture: ComponentFixture<UpdateMemberBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMemberBasicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMemberBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
