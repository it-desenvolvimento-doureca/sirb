import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisoesComponent } from './divisoes.component';

describe('DivisoesComponent', () => {
  let component: DivisoesComponent;
  let fixture: ComponentFixture<DivisoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
