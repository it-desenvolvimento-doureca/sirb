import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemposrespostaComponent } from './temposresposta.component';

describe('TemposrespostaComponent', () => {
  let component: TemposrespostaComponent;
  let fixture: ComponentFixture<TemposrespostaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemposrespostaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemposrespostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
