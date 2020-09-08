import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemManutencoesComponent } from './listagem-manutencoes.component';

describe('ListagemManutencoesComponent', () => {
  let component: ListagemManutencoesComponent;
  let fixture: ComponentFixture<ListagemManutencoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemManutencoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemManutencoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
