import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheirosanaliseComponent } from './ficheirosanalise.component';

describe('FicheirosanaliseComponent', () => {
  let component: FicheirosanaliseComponent;
  let fixture: ComponentFixture<FicheirosanaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheirosanaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheirosanaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
