import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingMeetingRulesComponent } from './starting-meeting-rules.component';

describe('StartingMeetingRulesComponent', () => {
  let component: StartingMeetingRulesComponent;
  let fixture: ComponentFixture<StartingMeetingRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingMeetingRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingMeetingRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
