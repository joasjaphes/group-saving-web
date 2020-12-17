import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupNameComponent } from './group-name.component';

describe('GroupNameComponent', () => {
  let component: GroupNameComponent;
  let fixture: ComponentFixture<GroupNameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
