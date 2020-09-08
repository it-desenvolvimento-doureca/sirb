import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloSegurancaTrabalhoComponent } from './modulo-seguranca-trabalho.component';

describe('ModuloSegurancaTrabalhoComponent', () => {
  let component: ModuloSegurancaTrabalhoComponent;
  let fixture: ComponentFixture<ModuloSegurancaTrabalhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloSegurancaTrabalhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloSegurancaTrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
