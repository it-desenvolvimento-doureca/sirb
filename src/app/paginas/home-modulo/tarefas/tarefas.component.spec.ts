import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefasComponent } from './tarefas.component';

describe('TarefasComponent', () => {
  let component: TarefasComponent;
  let fixture: ComponentFixture<TarefasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
