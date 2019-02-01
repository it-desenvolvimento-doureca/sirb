import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListareclamacoesclientesComponent } from './listareclamacoesclientes.component';

describe('ListareclamacoesclientesComponent', () => {
  let component: ListareclamacoesclientesComponent;
  let fixture: ComponentFixture<ListareclamacoesclientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListareclamacoesclientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListareclamacoesclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
