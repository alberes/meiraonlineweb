import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickLeaveSaveComponent } from './sick-leave-save.component';

describe('SickLeaveSaveComponent', () => {
  let component: SickLeaveSaveComponent;
  let fixture: ComponentFixture<SickLeaveSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickLeaveSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickLeaveSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
