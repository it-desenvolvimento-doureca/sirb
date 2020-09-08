import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposOcorrenciaComponent } from './tipos-ocorrencia.component';

describe('TiposOcorrenciaComponent', () => {
  let component: TiposOcorrenciaComponent;
  let fixture: ComponentFixture<TiposOcorrenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposOcorrenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
