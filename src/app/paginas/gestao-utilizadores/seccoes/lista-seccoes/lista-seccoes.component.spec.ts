import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSeccoesComponent } from './lista-seccoes.component';

describe('ListaSeccoesComponent', () => {
  let component: ListaSeccoesComponent;
  let fixture: ComponentFixture<ListaSeccoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSeccoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSeccoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
