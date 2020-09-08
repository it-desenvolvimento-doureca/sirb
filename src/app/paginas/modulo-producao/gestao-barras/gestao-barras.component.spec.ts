import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoBarrasComponent } from './gestao-barras.component';

describe('GestaoBarrasComponent', () => {
  let component: GestaoBarrasComponent;
  let fixture: ComponentFixture<GestaoBarrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoBarrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoBarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
