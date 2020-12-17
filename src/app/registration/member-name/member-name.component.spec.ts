import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNameComponent } from './member-name.component';

describe('MemberNameComponent', () => {
  let component: MemberNameComponent;
  let fixture: ComponentFixture<MemberNameComponent>;

  beforeEach(async(() => {
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
