import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriasComponent } from './auditorias.component';

describe('AuditoriasComponent', () => {
  let component: AuditoriasComponent;
  let fixture: ComponentFixture<AuditoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
