import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimentoFaturacaoAnualComponent } from './seguimento-faturacao-anual.component';

describe('SeguimentoFaturacaoAnualComponent', () => {
  let component: SeguimentoFaturacaoAnualComponent;
  let fixture: ComponentFixture<SeguimentoFaturacaoAnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimentoFaturacaoAnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimentoFaturacaoAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
