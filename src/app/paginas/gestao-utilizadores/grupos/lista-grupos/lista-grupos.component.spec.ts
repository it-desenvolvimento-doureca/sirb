import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGruposComponent } from './lista-grupos.component';

describe('ListaGruposComponent', () => {
  let component: ListaGruposComponent;
  let fixture: ComponentFixture<ListaGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
