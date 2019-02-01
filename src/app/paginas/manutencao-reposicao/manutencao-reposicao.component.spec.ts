import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoReposicaoComponent } from './manutencao-reposicao.component';

describe('ManutencaoReposicaoComponent', () => {
  let component: ManutencaoReposicaoComponent;
  let fixture: ComponentFixture<ManutencaoReposicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManutencaoReposicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoReposicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
