import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaplanosComponent } from './listaplanos.component';

describe('ListaplanosComponent', () => {
  let component: ListaplanosComponent;
  let fixture: ComponentFixture<ListaplanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaplanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaplanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
