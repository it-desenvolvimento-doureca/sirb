import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanosEstrategicosComponent } from './form-planos-estrategicos.component';

describe('FormPlanosEstrategicosComponent', () => {
  let component: FormPlanosEstrategicosComponent;
  let fixture: ComponentFixture<FormPlanosEstrategicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPlanosEstrategicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlanosEstrategicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
