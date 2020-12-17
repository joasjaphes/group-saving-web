import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingGroupComponent } from './creating-group.component';

describe('CreatingGroupComponent', () => {
  let component: CreatingGroupComponent;
  let fixture: ComponentFixture<CreatingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
