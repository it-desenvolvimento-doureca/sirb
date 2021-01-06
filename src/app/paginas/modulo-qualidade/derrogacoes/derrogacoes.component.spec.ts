import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DerrogacoesComponent } from './derrogacoes.component';

describe('DerrogacoesComponent', () => {
  let component: DerrogacoesComponent;
  let fixture: ComponentFixture<DerrogacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DerrogacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DerrogacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
