import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEquipamentoComponent } from './ficha-equipamento.component';

describe('FichaEquipamentoComponent', () => {
  let component: FichaEquipamentoComponent;
  let fixture: ComponentFixture<FichaEquipamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaEquipamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
