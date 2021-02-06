import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineTypesComponent } from './fine-types.component';

describe('FineTypesComponent', () => {
  let component: FineTypesComponent;
  let fixture: ComponentFixture<FineTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FineTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FineTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
