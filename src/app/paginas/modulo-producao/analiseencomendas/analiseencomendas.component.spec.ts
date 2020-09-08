import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseencomendasComponent } from './analiseencomendas.component';

describe('AnaliseencomendasComponent', () => {
  let component: AnaliseencomendasComponent;
  let fixture: ComponentFixture<AnaliseencomendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseencomendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseencomendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
