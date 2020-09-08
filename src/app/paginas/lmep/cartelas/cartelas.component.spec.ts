import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelasComponent } from './cartelas.component';

describe('CartelasComponent', () => {
  let component: CartelasComponent;
  let fixture: ComponentFixture<CartelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
