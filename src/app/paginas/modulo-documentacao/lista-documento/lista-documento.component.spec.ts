import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDocumentoComponent } from './lista-documento.component';

describe('ListaDocumentoComponent', () => {
  let component: ListaDocumentoComponent;
  let fixture: ComponentFixture<ListaDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
