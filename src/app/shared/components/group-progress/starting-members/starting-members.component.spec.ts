import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingMembersComponent } from './starting-members.component';

describe('StartingMembersComponent', () => {
  let component: StartingMembersComponent;
  let fixture: ComponentFixture<StartingMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
