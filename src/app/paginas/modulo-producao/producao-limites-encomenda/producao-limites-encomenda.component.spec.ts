import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoLimitesEncomendaComponent } from './producao-limites-encomenda.component';

describe('ProducaoLimitesEncomendaComponent', () => {
  let component: ProducaoLimitesEncomendaComponent;
  let fixture: ComponentFixture<ProducaoLimitesEncomendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducaoLimitesEncomendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducaoLimitesEncomendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
