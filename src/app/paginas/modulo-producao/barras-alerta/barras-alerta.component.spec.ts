import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrasAlertaComponent } from './barras-alerta.component';

describe('BarrasAlertaComponent', () => {
  let component: BarrasAlertaComponent;
  let fixture: ComponentFixture<BarrasAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrasAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrasAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
