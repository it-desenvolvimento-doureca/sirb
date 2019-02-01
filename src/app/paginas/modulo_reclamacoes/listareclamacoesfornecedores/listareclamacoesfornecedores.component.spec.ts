import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListareclamacoesfornecedoresComponent } from './listareclamacoesfornecedores.component';

describe('ListareclamacoesfornecedoresComponent', () => {
  let component: ListareclamacoesfornecedoresComponent;
  let fixture: ComponentFixture<ListareclamacoesfornecedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListareclamacoesfornecedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListareclamacoesfornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
