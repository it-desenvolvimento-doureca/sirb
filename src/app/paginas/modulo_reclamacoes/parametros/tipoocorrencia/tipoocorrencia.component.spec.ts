import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoocorrenciaComponent } from './tipoocorrencia.component';

describe('TipoocorrenciaComponent', () => {
  let component: TipoocorrenciaComponent;
  let fixture: ComponentFixture<TipoocorrenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoocorrenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoocorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
