import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadeAcabamentoComponent } from './capacidade-acabamento.component';

describe('CapacidadeAcabamentoComponent', () => {
  let component: CapacidadeAcabamentoComponent;
  let fixture: ComponentFixture<CapacidadeAcabamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacidadeAcabamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadeAcabamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
