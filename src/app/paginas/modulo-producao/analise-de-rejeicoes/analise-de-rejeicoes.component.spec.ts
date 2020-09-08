import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseDeRejeicoesComponent } from './analise-de-rejeicoes.component';

describe('AnaliseDeRejeicoesComponent', () => {
  let component: AnaliseDeRejeicoesComponent;
  let fixture: ComponentFixture<AnaliseDeRejeicoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseDeRejeicoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseDeRejeicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
