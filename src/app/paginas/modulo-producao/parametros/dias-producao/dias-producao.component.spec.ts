import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasProducaoComponent } from './dias-producao.component';

describe('DiasProducaoComponent', () => {
  let component: DiasProducaoComponent;
  let fixture: ComponentFixture<DiasProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiasProducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiasProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
