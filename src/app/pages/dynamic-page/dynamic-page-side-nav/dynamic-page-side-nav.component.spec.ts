import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPageSideNavComponent } from './dynamic-page-side-nav.component';

describe('DynamicPageSideNavComponent', () => {
  let component: DynamicPageSideNavComponent;
  let fixture: ComponentFixture<DynamicPageSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicPageSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPageSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
