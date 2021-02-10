import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteMeetingComponent } from './complete-meeting.component';

describe('CompleteMeetingComponent', () => {
  let component: CompleteMeetingComponent;
  let fixture: ComponentFixture<CompleteMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
