import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacoesBastidoresComponent } from './validacoes-bastidores.component';

describe('ValidacoesBastidoresComponent', () => {
  let component: ValidacoesBastidoresComponent;
  let fixture: ComponentFixture<ValidacoesBastidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacoesBastidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacoesBastidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
