import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoTarefasComponent } from './gestao-tarefas.component';

describe('GestaoTarefasComponent', () => {
  let component: GestaoTarefasComponent;
  let fixture: ComponentFixture<GestaoTarefasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoTarefasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
