import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbitosManutencaoComponent } from './ambitos-manutencao.component';

describe('AmbitosManutencaoComponent', () => {
  let component: AmbitosManutencaoComponent;
  let fixture: ComponentFixture<AmbitosManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbitosManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbitosManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
