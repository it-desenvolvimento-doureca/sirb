import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidosMelhoriaManutencaoComponent } from './lista-pedidos-melhoria-manutencao.component';

describe('ListaPedidosMelhoriaManutencaoComponent', () => {
  let component: ListaPedidosMelhoriaManutencaoComponent;
  let fixture: ComponentFixture<ListaPedidosMelhoriaManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPedidosMelhoriaManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPedidosMelhoriaManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
