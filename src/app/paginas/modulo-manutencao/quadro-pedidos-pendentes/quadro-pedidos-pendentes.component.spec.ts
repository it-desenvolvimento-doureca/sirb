import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroPedidosPendentesComponent } from './quadro-pedidos-pendentes.component';

describe('QuadroPedidosPendentesComponent', () => {
  let component: QuadroPedidosPendentesComponent;
  let fixture: ComponentFixture<QuadroPedidosPendentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadroPedidosPendentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadroPedidosPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
