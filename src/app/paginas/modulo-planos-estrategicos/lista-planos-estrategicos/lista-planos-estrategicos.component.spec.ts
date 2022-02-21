import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlanosEstrategicosComponent } from './lista-planos-estrategicos.component';

describe('ListaPlanosEstrategicosComponent', () => {
  let component: ListaPlanosEstrategicosComponent;
  let fixture: ComponentFixture<ListaPlanosEstrategicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPlanosEstrategicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlanosEstrategicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
