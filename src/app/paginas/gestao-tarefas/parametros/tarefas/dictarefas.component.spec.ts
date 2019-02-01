import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GTDICTarefasComponent } from './dictarefas.component';

describe('TarefasComponent', () => {
  let component: GTDICTarefasComponent;
  let fixture: ComponentFixture<GTDICTarefasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GTDICTarefasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GTDICTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
