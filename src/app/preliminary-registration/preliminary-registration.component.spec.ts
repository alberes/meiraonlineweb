import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreliminaryRegistrationComponent } from './preliminary-registration.component';

describe('PreliminaryRegistrationComponent', () => {
  let component: PreliminaryRegistrationComponent;
  let fixture: ComponentFixture<PreliminaryRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreliminaryRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreliminaryRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
