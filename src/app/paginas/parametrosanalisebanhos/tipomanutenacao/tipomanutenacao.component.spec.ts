import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipomanutenacaoComponent } from './tipomanutenacao.component';

describe('TipomanutenacaoComponent', () => {
  let component: TipomanutenacaoComponent;
  let fixture: ComponentFixture<TipomanutenacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipomanutenacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipomanutenacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
