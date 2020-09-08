import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneamentoAnalisesComponent } from './planeamento-analises.component';

describe('PlaneamentoAnalisesComponent', () => {
  let component: PlaneamentoAnalisesComponent;
  let fixture: ComponentFixture<PlaneamentoAnalisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneamentoAnalisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneamentoAnalisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
