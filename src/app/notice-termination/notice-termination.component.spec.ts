import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeTerminationComponent } from './notice-termination.component';

describe('NoticeTerminationComponent', () => {
  let component: NoticeTerminationComponent;
  let fixture: ComponentFixture<NoticeTerminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeTerminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeTerminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
