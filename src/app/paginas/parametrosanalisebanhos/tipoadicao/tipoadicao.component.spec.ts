import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoadicaoComponent } from './tipoadicao.component';

describe('TipoadicaoComponent', () => {
  let component: TipoadicaoComponent;
  let fixture: ComponentFixture<TipoadicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoadicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoadicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
