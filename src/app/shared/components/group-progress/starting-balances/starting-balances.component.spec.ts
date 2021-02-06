import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingBalancesComponent } from './starting-balances.component';

describe('StartingBalancesComponent', () => {
  let component: StartingBalancesComponent;
  let fixture: ComponentFixture<StartingBalancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingBalancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
