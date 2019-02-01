import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoeventostemporaisComponent } from './gestaoeventostemporais.component';

describe('GestaoeventostemporaisComponent', () => {
  let component: GestaoeventostemporaisComponent;
  let fixture: ComponentFixture<GestaoeventostemporaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoeventostemporaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoeventostemporaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
