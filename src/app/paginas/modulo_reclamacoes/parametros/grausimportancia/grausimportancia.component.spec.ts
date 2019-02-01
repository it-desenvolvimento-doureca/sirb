import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrausimportanciaComponent } from './grausimportancia.component';

describe('GrausimportanciaComponent', () => {
  let component: GrausimportanciaComponent;
  let fixture: ComponentFixture<GrausimportanciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrausimportanciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrausimportanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
