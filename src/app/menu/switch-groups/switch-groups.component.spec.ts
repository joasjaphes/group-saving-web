import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchGroupsComponent } from './switch-groups.component';

describe('SwitchGroupsComponent', () => {
  let component: SwitchGroupsComponent;
  let fixture: ComponentFixture<SwitchGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
