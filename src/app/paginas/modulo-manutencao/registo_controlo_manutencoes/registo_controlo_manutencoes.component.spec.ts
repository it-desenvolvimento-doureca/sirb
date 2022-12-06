/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Registo_controlo_manutencoesComponent } from './registo_controlo_manutencoes.component';

describe('Registo_controlo_manutencoesComponent', () => {
  let component: Registo_controlo_manutencoesComponent;
  let fixture: ComponentFixture<Registo_controlo_manutencoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registo_controlo_manutencoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registo_controlo_manutencoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
