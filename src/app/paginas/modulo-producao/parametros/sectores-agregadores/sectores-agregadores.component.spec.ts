import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectoresAgregadoresComponent } from './sectores-agregadores.component';

describe('SectoresAgregadoresComponent', () => {
  let component: SectoresAgregadoresComponent;
  let fixture: ComponentFixture<SectoresAgregadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectoresAgregadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectoresAgregadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
