import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivosPlanosComponent } from './objetivos-planos.component';

describe('ObjetivosPlanosComponent', () => {
  let component: ObjetivosPlanosComponent;
  let fixture: ComponentFixture<ObjetivosPlanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjetivosPlanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivosPlanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
