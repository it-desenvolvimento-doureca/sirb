import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneamentoProducaoComponent } from './planeamento-producao.component';

describe('PlaneamentoProducaoComponent', () => {
  let component: PlaneamentoProducaoComponent;
  let fixture: ComponentFixture<PlaneamentoProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneamentoProducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneamentoProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
