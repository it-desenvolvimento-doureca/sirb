import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaacoesComponent } from './listaacoes.component';

describe('ListaacoesComponent', () => {
  let component: ListaacoesComponent;
  let fixture: ComponentFixture<ListaacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
