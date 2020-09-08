import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposdefeitoComponent } from './tiposdefeito.component';

describe('TiposdefeitoComponent', () => {
  let component: TiposdefeitoComponent;
  let fixture: ComponentFixture<TiposdefeitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposdefeitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposdefeitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
