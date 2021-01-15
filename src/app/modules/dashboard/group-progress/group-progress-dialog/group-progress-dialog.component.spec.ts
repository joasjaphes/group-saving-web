import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProgressDialogComponent } from './group-progress-dialog.component';

describe('GroupProgressDialogComponent', () => {
  let component: GroupProgressDialogComponent;
  let fixture: ComponentFixture<GroupProgressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupProgressDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProgressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
