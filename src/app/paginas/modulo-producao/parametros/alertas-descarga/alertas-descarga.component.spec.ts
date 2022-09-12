import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasDescargaComponent } from './alertas-descarga.component';

describe('AlertasDescargaComponent', () => {
  let component: AlertasDescargaComponent;
  let fixture: ComponentFixture<AlertasDescargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertasDescargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertasDescargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
