import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoFabricasComponent } from './producao-fabricas.component';

describe('ProducaoFabricasComponent', () => {
  let component: ProducaoFabricasComponent;
  let fixture: ComponentFixture<ProducaoFabricasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducaoFabricasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducaoFabricasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
