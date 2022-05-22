import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedCollectionComponent } from './expected-collection.component';

describe('ExpectedCollectionComponent', () => {
  let component: ExpectedCollectionComponent;
  let fixture: ComponentFixture<ExpectedCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpectedCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
