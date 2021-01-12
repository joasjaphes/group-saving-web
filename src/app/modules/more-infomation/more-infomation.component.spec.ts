import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfomationComponent } from './more-infomation.component';

describe('MoreInfomationComponent', () => {
  let component: MoreInfomationComponent;
  let fixture: ComponentFixture<MoreInfomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreInfomationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
