import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelMeetingComponent } from './cancel-meeting.component';

describe('CancelMeetingComponent', () => {
  let component: CancelMeetingComponent;
  let fixture: ComponentFixture<CancelMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
