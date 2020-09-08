import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCacifosComponent } from './tipo-cacifos.component';

describe('TipoCacifosComponent', () => {
  let component: TipoCacifosComponent;
  let fixture: ComponentFixture<TipoCacifosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCacifosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCacifosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
