import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseLoteFornecedorComponent } from './analise-lote-fornecedor.component';

describe('AnaliseLoteFornecedorComponent', () => {
  let component: AnaliseLoteFornecedorComponent;
  let fixture: ComponentFixture<AnaliseLoteFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseLoteFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseLoteFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
