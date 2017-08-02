import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizadoresComponent } from './utilizadores.component';

describe('UtilizadoresComponent', () => {
  let component: UtilizadoresComponent;
  let fixture: ComponentFixture<UtilizadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
