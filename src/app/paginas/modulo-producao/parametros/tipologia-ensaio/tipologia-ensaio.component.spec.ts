import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipologiaEnsaioComponent } from './tipologia-ensaio.component';

describe('TipologiaEnsaioComponent', () => {
  let component: TipologiaEnsaioComponent;
  let fixture: ComponentFixture<TipologiaEnsaioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipologiaEnsaioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipologiaEnsaioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
