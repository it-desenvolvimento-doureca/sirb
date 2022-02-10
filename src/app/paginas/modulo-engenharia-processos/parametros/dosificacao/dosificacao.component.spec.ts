import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosificacaoComponent } from './dosificacao.component';

describe('DosificacaoComponent', () => {
  let component: DosificacaoComponent;
  let fixture: ComponentFixture<DosificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
