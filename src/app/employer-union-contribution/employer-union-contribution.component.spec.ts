import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerUnionContributionComponent } from './employer-union-contribution.component';

describe('EmployerUnionContributionComponent', () => {
  let component: EmployerUnionContributionComponent;
  let fixture: ComponentFixture<EmployerUnionContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerUnionContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerUnionContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
