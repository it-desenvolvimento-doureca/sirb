import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeicoesComponent } from './rejeicoes.component';

describe('RejeicoesComponent', () => {
  let component: RejeicoesComponent;
  let fixture: ComponentFixture<RejeicoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejeicoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejeicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
