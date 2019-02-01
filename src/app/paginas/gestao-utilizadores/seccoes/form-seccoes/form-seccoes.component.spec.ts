import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeccoesComponent } from './form-seccoes.component';

describe('FormSeccoesComponent', () => {
  let component: FormSeccoesComponent;
  let fixture: ComponentFixture<FormSeccoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSeccoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSeccoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
