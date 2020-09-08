import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoeventosComponent } from './gestaoeventos.component';

describe('GestaoeventosComponent', () => {
  let component: GestaoeventosComponent;
  let fixture: ComponentFixture<GestaoeventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoeventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoeventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
