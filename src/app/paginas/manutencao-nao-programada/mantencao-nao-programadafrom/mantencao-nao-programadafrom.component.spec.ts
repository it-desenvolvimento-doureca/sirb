import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantencaoNaoProgramadafromComponent } from './mantencao-nao-programadafrom.component';

describe('MantencaoNaoProgramadafromComponent', () => {
  let component: MantencaoNaoProgramadafromComponent;
  let fixture: ComponentFixture<MantencaoNaoProgramadafromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantencaoNaoProgramadafromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantencaoNaoProgramadafromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
