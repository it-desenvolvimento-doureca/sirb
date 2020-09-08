import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneamentosComponent } from './planeamentos.component';

describe('PlaneamentosComponent', () => {
  let component: PlaneamentosComponent;
  let fixture: ComponentFixture<PlaneamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
