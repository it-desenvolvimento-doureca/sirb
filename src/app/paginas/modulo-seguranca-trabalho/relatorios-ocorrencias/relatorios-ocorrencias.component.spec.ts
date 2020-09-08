import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosOcorrenciasComponent } from './relatorios-ocorrencias.component';

describe('RelatoriosOcorrenciasComponent', () => {
  let component: RelatoriosOcorrenciasComponent;
  let fixture: ComponentFixture<RelatoriosOcorrenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatoriosOcorrenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriosOcorrenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
