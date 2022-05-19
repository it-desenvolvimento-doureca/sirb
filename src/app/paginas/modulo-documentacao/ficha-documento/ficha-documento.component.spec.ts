import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDocumentoComponent } from './ficha-documento.component';

describe('FichaDocumentoComponent', () => {
  let component: FichaDocumentoComponent;
  let fixture: ComponentFixture<FichaDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
