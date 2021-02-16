import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFromQueueComponent } from './remove-from-queue.component';

describe('RemoveFromQueueComponent', () => {
  let component: RemoveFromQueueComponent;
  let fixture: ComponentFixture<RemoveFromQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFromQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFromQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
