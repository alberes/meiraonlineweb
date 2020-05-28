import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeTerminationSaveComponent } from './notice-termination-save.component';

describe('NoticeTerminationSaveComponent', () => {
  let component: NoticeTerminationSaveComponent;
  let fixture: ComponentFixture<NoticeTerminationSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeTerminationSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeTerminationSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
