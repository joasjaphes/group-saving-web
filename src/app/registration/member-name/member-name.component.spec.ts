import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MemberNameComponent } from './member-name.component';

describe('MemberNameComponent', () => {
  let component: MemberNameComponent;
  let fixture: ComponentFixture<MemberNameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
