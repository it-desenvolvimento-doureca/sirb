import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosMelhoriaManutencaoComponent } from './pedidos-melhoria-manutencao.component';

describe('PedidosMelhoriaManutencaoComponent', () => {
  let component: PedidosMelhoriaManutencaoComponent;
  let fixture: ComponentFixture<PedidosMelhoriaManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosMelhoriaManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosMelhoriaManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
