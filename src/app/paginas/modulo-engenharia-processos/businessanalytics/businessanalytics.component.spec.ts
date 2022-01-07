import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessanalyticsComponent } from './businessanalytics.component';

describe('BusinessanalyticsComponent', () => {
  let component: BusinessanalyticsComponent;
  let fixture: ComponentFixture<BusinessanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
