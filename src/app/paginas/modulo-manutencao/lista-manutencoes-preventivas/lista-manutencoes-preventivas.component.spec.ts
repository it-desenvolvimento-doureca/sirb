import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaManutencoesPreventivasComponent } from './lista-manutencoes-preventivas.component';

describe('ListaManutencoesPreventivasComponent', () => {
  let component: ListaManutencoesPreventivasComponent;
  let fixture: ComponentFixture<ListaManutencoesPreventivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaManutencoesPreventivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaManutencoesPreventivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
