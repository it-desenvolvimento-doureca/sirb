import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamacaoCliente8DComponent } from './reclamacao-cliente-8-d.component';

describe('ReclamacaoCliente8DComponent', () => {
  let component: ReclamacaoCliente8DComponent;
  let fixture: ComponentFixture<ReclamacaoCliente8DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamacaoCliente8DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamacaoCliente8DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
