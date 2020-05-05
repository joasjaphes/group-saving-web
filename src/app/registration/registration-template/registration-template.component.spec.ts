import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationTemplateComponent } from './registration-template.component';

describe('RegistrationTemplateComponent', () => {
  let component: RegistrationTemplateComponent;
  let fixture: ComponentFixture<RegistrationTemplateComponent>;

  beforeEach(async(() => {
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
