import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposreclamacoesComponent } from './tiposreclamacoes.component';

describe('TiposreclamacoesComponent', () => {
  let component: TiposreclamacoesComponent;
  let fixture: ComponentFixture<TiposreclamacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposreclamacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposreclamacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
