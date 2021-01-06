import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DerrogacoesFormComponent } from './derrogacoes-form.component';

describe('DerrogacoesFormComponent', () => {
  let component: DerrogacoesFormComponent;
  let fixture: ComponentFixture<DerrogacoesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DerrogacoesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DerrogacoesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
