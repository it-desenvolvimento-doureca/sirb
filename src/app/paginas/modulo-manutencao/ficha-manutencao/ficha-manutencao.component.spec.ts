import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaManutencaoComponent } from './ficha-manutencao.component';

describe('FichaManutencaoComponent', () => {
  let component: FichaManutencaoComponent;
  let fixture: ComponentFixture<FichaManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
