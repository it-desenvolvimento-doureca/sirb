import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosfuncionariosComponent } from './estadosfuncionarios.component';

describe('EstadosfuncionariosComponent', () => {
  let component: EstadosfuncionariosComponent;
  let fixture: ComponentFixture<EstadosfuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadosfuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosfuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
