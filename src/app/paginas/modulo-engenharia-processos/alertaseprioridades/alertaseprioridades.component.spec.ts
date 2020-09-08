import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaseprioridadesComponent } from './alertaseprioridades.component';

describe('AlertaseprioridadesComponent', () => {
  let component: AlertaseprioridadesComponent;
  let fixture: ComponentFixture<AlertaseprioridadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaseprioridadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaseprioridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
