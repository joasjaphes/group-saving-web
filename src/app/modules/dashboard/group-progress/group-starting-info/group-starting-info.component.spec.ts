import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStartingInfoComponent } from './group-starting-info.component';

describe('GroupStartingInfoComponent', () => {
  let component: GroupStartingInfoComponent;
  let fixture: ComponentFixture<GroupStartingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupStartingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStartingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
