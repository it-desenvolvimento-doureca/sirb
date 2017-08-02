import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesmedidaComponent } from './unidadesmedida.component';

describe('UnidadesmedidaComponent', () => {
  let component: UnidadesmedidaComponent;
  let fixture: ComponentFixture<UnidadesmedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesmedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesmedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
