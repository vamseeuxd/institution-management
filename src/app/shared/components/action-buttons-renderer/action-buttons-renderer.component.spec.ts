import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsRendererComponent } from './action-buttons-renderer.component';

describe('ActionButtonsRendererComponent', () => {
  let component: ActionButtonsRendererComponent;
  let fixture: ComponentFixture<ActionButtonsRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
