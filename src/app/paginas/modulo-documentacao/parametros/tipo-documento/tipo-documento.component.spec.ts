import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocumentoComponent } from './tipo-documento.component';

describe('TipoDocumentoComponent', () => {
  let component: TipoDocumentoComponent;
  let fixture: ComponentFixture<TipoDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
