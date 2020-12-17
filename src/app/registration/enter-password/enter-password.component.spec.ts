import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnterPasswordComponent } from './enter-password.component';

describe('EnterPasswordComponent', () => {
  let component: EnterPasswordComponent;
  let fixture: ComponentFixture<EnterPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
