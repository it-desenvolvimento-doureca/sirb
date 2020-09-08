import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlameamentoAnalisesFormComponent } from './plameamento-analises-form.component';

describe('PlameamentoAnalisesFormComponent', () => {
  let component: PlameamentoAnalisesFormComponent;
  let fixture: ComponentFixture<PlameamentoAnalisesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlameamentoAnalisesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlameamentoAnalisesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
