/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EquipamentosCriticosComponent } from './equipamentos-criticos.component';

describe('EquipamentosCriticosComponent', () => {
  let component: EquipamentosCriticosComponent;
  let fixture: ComponentFixture<EquipamentosCriticosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentosCriticosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentosCriticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
