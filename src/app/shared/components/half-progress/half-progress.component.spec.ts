import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfProgressComponent } from './half-progress.component';

describe('HalfProgressComponent', () => {
  let component: HalfProgressComponent;
  let fixture: ComponentFixture<HalfProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalfProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
