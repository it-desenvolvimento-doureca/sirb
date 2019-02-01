import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoNaoProgramadaComponent } from './manutencao-nao-programada.component';

describe('ManutencaoNaoProgramadaComponent', () => {
  let component: ManutencaoNaoProgramadaComponent;
  let fixture: ComponentFixture<ManutencaoNaoProgramadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManutencaoNaoProgramadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoNaoProgramadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
