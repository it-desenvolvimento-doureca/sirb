import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivosComponent } from './objetivos.component';

describe('ObjetivosComponent', () => {
  let component: ObjetivosComponent;
  let fixture: ComponentFixture<ObjetivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjetivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
