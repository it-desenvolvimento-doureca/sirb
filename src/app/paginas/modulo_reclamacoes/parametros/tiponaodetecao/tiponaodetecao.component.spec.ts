import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiponaodetecaoComponent } from './tiponaodetecao.component';

describe('TiponaodetecaoComponent', () => {
  let component: TiponaodetecaoComponent;
  let fixture: ComponentFixture<TiponaodetecaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiponaodetecaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiponaodetecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
