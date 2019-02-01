import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseconsumosetiquetasComponent } from './analiseconsumosetiquetas.component';

describe('AnaliseconsumosetiquetasComponent', () => {
  let component: AnaliseconsumosetiquetasComponent;
  let fixture: ComponentFixture<AnaliseconsumosetiquetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseconsumosetiquetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseconsumosetiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
