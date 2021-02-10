import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextMeetingComponent } from './next-meeting.component';

describe('NextMeetingComponent', () => {
  let component: NextMeetingComponent;
  let fixture: ComponentFixture<NextMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
