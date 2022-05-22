import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportErmsDataComponent } from './import-erms-data.component';

describe('ImportErmsDataComponent', () => {
  let component: ImportErmsDataComponent;
  let fixture: ComponentFixture<ImportErmsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportErmsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportErmsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
