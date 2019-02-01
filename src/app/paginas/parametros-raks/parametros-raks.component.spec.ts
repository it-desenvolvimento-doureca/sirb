import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosRaksComponent } from './parametros-raks.component';

describe('ParametrosRaksComponent', () => {
  let component: ParametrosRaksComponent;
  let fixture: ComponentFixture<ParametrosRaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosRaksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosRaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
