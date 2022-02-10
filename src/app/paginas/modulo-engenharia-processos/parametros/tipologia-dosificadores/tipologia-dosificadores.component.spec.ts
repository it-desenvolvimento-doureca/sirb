import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipologiaDosificadoresComponent } from './tipologia-dosificadores.component';

describe('TipologiaDosificadoresComponent', () => {
  let component: TipologiaDosificadoresComponent;
  let fixture: ComponentFixture<TipologiaDosificadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipologiaDosificadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipologiaDosificadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
