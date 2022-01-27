import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportReminderComponent } from './import-reminder.component';

describe('ImportReminderComponent', () => {
  let component: ImportReminderComponent;
  let fixture: ComponentFixture<ImportReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
