import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosSeguimentoComponent } from './parametros-seguimento.component';

describe('ParametrosSeguimentoComponent', () => {
  let component: ParametrosSeguimentoComponent;
  let fixture: ComponentFixture<ParametrosSeguimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosSeguimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosSeguimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
