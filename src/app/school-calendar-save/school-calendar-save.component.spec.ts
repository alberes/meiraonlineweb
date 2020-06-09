import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCalendarSaveComponent } from './school-calendar-save.component';

describe('SchoolCalendarSaveComponent', () => {
  let component: SchoolCalendarSaveComponent;
  let fixture: ComponentFixture<SchoolCalendarSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolCalendarSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCalendarSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
