import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoFormComponent } from './contrato-form.component';

describe('ContratoFormComponent', () => {
  let component: ContratoFormComponent;
  let fixture: ComponentFixture<ContratoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
