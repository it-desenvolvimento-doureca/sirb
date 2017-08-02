import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosComponent } from './turnos.component';

describe('TurnosComponent', () => {
  let component: TurnosComponent;
  let fixture: ComponentFixture<TurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
