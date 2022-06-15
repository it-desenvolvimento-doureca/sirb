import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormManutencaoComponent } from './form-manutencao.component';

describe('FormManutencaoComponent', () => {
  let component: FormManutencaoComponent;
  let fixture: ComponentFixture<FormManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
