/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndicadoresMttrMtbfComponent } from './indicadores-mttr-mtbf.component';

describe('IndicadoresMttrMtbfComponent', () => {
  let component: IndicadoresMttrMtbfComponent;
  let fixture: ComponentFixture<IndicadoresMttrMtbfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadoresMttrMtbfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresMttrMtbfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
