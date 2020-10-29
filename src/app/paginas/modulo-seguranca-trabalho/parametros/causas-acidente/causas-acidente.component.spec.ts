import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CausasAcidenteComponent } from './causas-acidente.component';

describe('CausasAcidenteComponent', () => {
  let component: CausasAcidenteComponent;
  let fixture: ComponentFixture<CausasAcidenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CausasAcidenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CausasAcidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
