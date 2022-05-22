import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedCollectionItemComponent } from './expected-collection-item.component';

describe('ExpectedCollectionItemComponent', () => {
  let component: ExpectedCollectionItemComponent;
  let fixture: ComponentFixture<ExpectedCollectionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpectedCollectionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedCollectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
