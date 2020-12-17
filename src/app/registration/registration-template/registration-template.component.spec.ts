import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationTemplateComponent } from './registration-template.component';

describe('RegistrationTemplateComponent', () => {
  let component: RegistrationTemplateComponent;
  let fixture: ComponentFixture<RegistrationTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
