import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseClientesComponent } from './analise-clientes.component';

describe('AnaliseClientesComponent', () => {
  let component: AnaliseClientesComponent;
  let fixture: ComponentFixture<AnaliseClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
