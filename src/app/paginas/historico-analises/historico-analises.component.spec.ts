import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAnalisesComponent } from './historico-analises.component';

describe('HistoricoAnalisesComponent', () => {
  let component: HistoricoAnalisesComponent;
  let fixture: ComponentFixture<HistoricoAnalisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoAnalisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoAnalisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
