import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectoresAbsentismoComponent } from './sectores-absentismo.component';

describe('SectoresAbsentismoComponent', () => {
  let component: SectoresAbsentismoComponent;
  let fixture: ComponentFixture<SectoresAbsentismoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectoresAbsentismoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectoresAbsentismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
