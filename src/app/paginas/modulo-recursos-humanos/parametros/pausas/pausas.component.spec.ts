import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PausasComponent } from './pausas.component';

describe('PausasComponent', () => {
  let component: PausasComponent;
  let fixture: ComponentFixture<PausasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PausasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PausasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
