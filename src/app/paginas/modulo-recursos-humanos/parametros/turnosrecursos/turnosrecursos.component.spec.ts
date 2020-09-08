import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosrecursosComponent } from './turnosrecursos.component';

describe('TurnosrecursosComponent', () => {
  let component: TurnosrecursosComponent;
  let fixture: ComponentFixture<TurnosrecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosrecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosrecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
