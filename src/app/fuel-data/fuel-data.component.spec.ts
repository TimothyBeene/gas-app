import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelDataComponent } from './fuel-data.component';

describe('FuelDataComponent', () => {
  let component: FuelDataComponent;
  let fixture: ComponentFixture<FuelDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
