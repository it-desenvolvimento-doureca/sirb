import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbitosComponent } from './ambitos.component';

describe('AmbitosComponent', () => {
  let component: AmbitosComponent;
  let fixture: ComponentFixture<AmbitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
