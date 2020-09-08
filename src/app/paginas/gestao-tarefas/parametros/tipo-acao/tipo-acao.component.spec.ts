import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAcaoComponent } from './tipo-acao.component';

describe('TipoAcaoComponent', () => {
  let component: TipoAcaoComponent;
  let fixture: ComponentFixture<TipoAcaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAcaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
