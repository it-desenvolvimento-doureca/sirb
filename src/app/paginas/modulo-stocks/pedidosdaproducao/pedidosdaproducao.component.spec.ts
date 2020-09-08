import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosdaproducaoComponent } from './pedidosdaproducao.component';

describe('PedidosdaproducaoComponent', () => {
  let component: PedidosdaproducaoComponent;
  let fixture: ComponentFixture<PedidosdaproducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosdaproducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosdaproducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
