import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstrucaoBanhosComponent } from './construcao-banhos.component';

describe('ConstrucaoBanhosComponent', () => {
  let component: ConstrucaoBanhosComponent;
  let fixture: ComponentFixture<ConstrucaoBanhosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstrucaoBanhosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstrucaoBanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
