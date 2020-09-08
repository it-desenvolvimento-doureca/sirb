import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipologiaComponent } from './tipologia.component';

describe('TipologiaComponent', () => {
  let component: TipologiaComponent;
  let fixture: ComponentFixture<TipologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
