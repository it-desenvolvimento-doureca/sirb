import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoManutencoesComponent } from './historico-manutencoes.component';

describe('HistoricoManutencoesComponent', () => {
  let component: HistoricoManutencoesComponent;
  let fixture: ComponentFixture<HistoricoManutencoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoManutencoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoManutencoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
