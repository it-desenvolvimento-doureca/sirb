import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoComponent } from './classificacao.component';

describe('ClassificacaoComponent', () => {
  let component: ClassificacaoComponent;
  let fixture: ComponentFixture<ClassificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
