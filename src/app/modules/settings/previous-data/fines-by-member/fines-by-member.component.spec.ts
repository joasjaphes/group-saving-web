import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinesByMemberComponent } from './fines-by-member.component';

describe('FinesByMemberComponent', () => {
  let component: FinesByMemberComponent;
  let fixture: ComponentFixture<FinesByMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinesByMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinesByMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
