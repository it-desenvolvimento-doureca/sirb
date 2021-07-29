import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAmbitosReunioesComponent } from './form-ambitos-reunioes.component';

describe('FormAmbitosReunioesComponent', () => {
  let component: FormAmbitosReunioesComponent;
  let fixture: ComponentFixture<FormAmbitosReunioesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAmbitosReunioesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAmbitosReunioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
