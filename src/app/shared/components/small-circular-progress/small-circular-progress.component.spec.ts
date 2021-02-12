import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCircularProgressComponent } from './small-circular-progress.component';

describe('CircularProgressComponent', () => {
  let component: SmallCircularProgressComponent;
  let fixture: ComponentFixture<SmallCircularProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallCircularProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCircularProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
