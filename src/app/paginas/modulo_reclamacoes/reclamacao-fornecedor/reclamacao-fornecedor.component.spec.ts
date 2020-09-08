import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamacaoFornecedorComponent } from './reclamacao-fornecedor.component';

describe('ReclamacaoFornecedorComponent', () => {
  let component: ReclamacaoFornecedorComponent;
  let fixture: ComponentFixture<ReclamacaoFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamacaoFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamacaoFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
