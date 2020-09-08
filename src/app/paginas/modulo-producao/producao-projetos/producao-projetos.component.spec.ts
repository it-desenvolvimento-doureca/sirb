import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoProjetosComponent } from './producao-projetos.component';

describe('ProducaoProjetosComponent', () => {
  let component: ProducaoProjetosComponent;
  let fixture: ComponentFixture<ProducaoProjetosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducaoProjetosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducaoProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
