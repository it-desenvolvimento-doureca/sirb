import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoVeiculosComponent } from './producao-veiculos.component';

describe('ProducaoVeiculosComponent', () => {
  let component: ProducaoVeiculosComponent;
  let fixture: ComponentFixture<ProducaoVeiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducaoVeiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducaoVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
