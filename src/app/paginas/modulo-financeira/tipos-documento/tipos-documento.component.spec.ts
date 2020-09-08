import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDocumentoComponent } from './tipos-documento.component';

describe('TiposDocumentoComponent', () => {
  let component: TiposDocumentoComponent;
  let fixture: ComponentFixture<TiposDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
