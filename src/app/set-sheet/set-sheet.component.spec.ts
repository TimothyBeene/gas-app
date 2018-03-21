import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSheetComponent } from './set-sheet.component';

describe('SetSheetComponent', () => {
  let component: SetSheetComponent;
  let fixture: ComponentFixture<SetSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
