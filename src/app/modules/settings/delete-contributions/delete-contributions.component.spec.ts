import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContributionsComponent } from './delete-contributions.component';

describe('DeleteContributionsComponent', () => {
  let component: DeleteContributionsComponent;
  let fixture: ComponentFixture<DeleteContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteContributionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
