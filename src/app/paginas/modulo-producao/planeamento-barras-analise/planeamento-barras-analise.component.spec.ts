import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneamentoBarrasAnaliseComponent } from './planeamento-barras-analise.component';

describe('PlaneamentoBarrasAnaliseComponent', () => {
  let component: PlaneamentoBarrasAnaliseComponent;
  let fixture: ComponentFixture<PlaneamentoBarrasAnaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneamentoBarrasAnaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneamentoBarrasAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
