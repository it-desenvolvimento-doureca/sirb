import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTarefasComponent } from './form-tarefas.component';

describe('FormTarefasComponent', () => {
  let component: FormTarefasComponent;
  let fixture: ComponentFixture<FormTarefasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTarefasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
