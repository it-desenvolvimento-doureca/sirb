/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TipologiaAvariaComponent } from './tipologia-avaria.component';

describe('TipologiaAvariaComponent', () => {
  let component: TipologiaAvariaComponent;
  let fixture: ComponentFixture<TipologiaAvariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipologiaAvariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipologiaAvariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
