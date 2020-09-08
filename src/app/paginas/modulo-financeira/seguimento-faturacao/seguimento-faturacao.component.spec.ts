import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimentoFaturacaoComponent } from './seguimento-faturacao.component';

describe('SeguimentoFaturacaoComponent', () => {
  let component: SeguimentoFaturacaoComponent;
  let fixture: ComponentFixture<SeguimentoFaturacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimentoFaturacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimentoFaturacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
