import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivosCumprimentoFornecedorComponent } from './objetivos-cumprimento-fornecedor.component';

describe('ObjetivosCumprimentoFornecedorComponent', () => {
  let component: ObjetivosCumprimentoFornecedorComponent;
  let fixture: ComponentFixture<ObjetivosCumprimentoFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjetivosCumprimentoFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivosCumprimentoFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
