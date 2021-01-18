import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingLeadershipComponent } from './starting-leadership.component';

describe('StartingLeadershipComponent', () => {
  let component: StartingLeadershipComponent;
  let fixture: ComponentFixture<StartingLeadershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingLeadershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
