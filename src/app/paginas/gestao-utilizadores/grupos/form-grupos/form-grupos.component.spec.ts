import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGruposComponent } from './form-grupos.component';

describe('FormGruposComponent', () => {
  let component: FormGruposComponent;
  let fixture: ComponentFixture<FormGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
