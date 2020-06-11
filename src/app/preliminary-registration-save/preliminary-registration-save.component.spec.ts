import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreliminaryRegistrationSaveComponent } from './preliminary-registration-save.component';

describe('PreliminaryRegistrationSaveComponent', () => {
  let component: PreliminaryRegistrationSaveComponent;
  let fixture: ComponentFixture<PreliminaryRegistrationSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreliminaryRegistrationSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreliminaryRegistrationSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
