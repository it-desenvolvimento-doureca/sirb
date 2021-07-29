import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbitosReunioesComponent } from './ambitos-reunioes.component';

describe('AmbitosReunioesComponent', () => {
  let component: AmbitosReunioesComponent;
  let fixture: ComponentFixture<AmbitosReunioesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbitosReunioesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbitosReunioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
