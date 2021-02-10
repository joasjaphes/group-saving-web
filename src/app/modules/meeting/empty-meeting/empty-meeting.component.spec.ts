import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyMeetingComponent } from './empty-meeting.component';

describe('EmptyMeetingComponent', () => {
  let component: EmptyMeetingComponent;
  let fixture: ComponentFixture<EmptyMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
