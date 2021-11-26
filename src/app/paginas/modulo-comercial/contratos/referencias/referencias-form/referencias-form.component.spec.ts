import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasFormComponent } from './referencias-form.component';

describe('ReferenciasFormComponent', () => {
  let component: ReferenciasFormComponent;
  let fixture: ComponentFixture<ReferenciasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenciasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
