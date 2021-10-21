import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucaoDividasComponent } from './evolucao-dividas.component';

describe('EvolucaoDividasComponent', () => {
  let component: EvolucaoDividasComponent;
  let fixture: ComponentFixture<EvolucaoDividasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolucaoDividasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucaoDividasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
