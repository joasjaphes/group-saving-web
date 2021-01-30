import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousDataComponent } from './previous-data.component';

describe('PreviousDataComponent', () => {
  let component: PreviousDataComponent;
  let fixture: ComponentFixture<PreviousDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
