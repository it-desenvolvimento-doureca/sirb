import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAuditoriaComponent } from './tipo-auditoria.component';

describe('TipoAuditoriaComponent', () => {
  let component: TipoAuditoriaComponent;
  let fixture: ComponentFixture<TipoAuditoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAuditoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
