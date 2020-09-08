import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneamentosFormComponent } from './planeamentos-form.component';

describe('PlaneamentosFormComponent', () => {
  let component: PlaneamentosFormComponent;
  let fixture: ComponentFixture<PlaneamentosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneamentosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneamentosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
