import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidosComponent } from './lista-pedidos.component';

describe('ListaPedidosComponent', () => {
  let component: ListaPedidosComponent;
  let fixture: ComponentFixture<ListaPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
