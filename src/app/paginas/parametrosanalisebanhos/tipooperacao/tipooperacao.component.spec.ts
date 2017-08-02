import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipooperacaoComponent } from './tipooperacao.component';

describe('TipooperacaoComponent', () => {
  let component: TipooperacaoComponent;
  let fixture: ComponentFixture<TipooperacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipooperacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipooperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
