import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseEtiquetasComponent } from './analise-etiquetas.component';

describe('AnaliseEtiquetasComponent', () => {
  let component: AnaliseEtiquetasComponent;
  let fixture: ComponentFixture<AnaliseEtiquetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseEtiquetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
