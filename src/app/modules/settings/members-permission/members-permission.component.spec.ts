import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersPermissionComponent } from './members-permission.component';

describe('MembersPermissionComponent', () => {
  let component: MembersPermissionComponent;
  let fixture: ComponentFixture<MembersPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
