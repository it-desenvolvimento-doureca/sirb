import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoslistaComponent } from './eventoslista.component';

describe('EventoslistaComponent', () => {
  let component: EventoslistaComponent;
  let fixture: ComponentFixture<EventoslistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoslistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
