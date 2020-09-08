import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivosCumprimentoClienteComponent } from './objetivos-cumprimento-cliente.component';

describe('ObjetivosCumprimentoClienteComponent', () => {
  let component: ObjetivosCumprimentoClienteComponent;
  let fixture: ComponentFixture<ObjetivosCumprimentoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjetivosCumprimentoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivosCumprimentoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
