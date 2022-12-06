/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfConsumosSilverComponent } from './conf-consumos-silver.component';

describe('ConfConsumosSilverComponent', () => {
  let component: ConfConsumosSilverComponent;
  let fixture: ComponentFixture<ConfConsumosSilverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfConsumosSilverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfConsumosSilverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
