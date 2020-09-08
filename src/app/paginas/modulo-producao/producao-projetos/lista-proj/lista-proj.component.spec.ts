import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProjComponent } from './lista-proj.component';

describe('ListaProjComponent', () => {
  let component: ListaProjComponent;
  let fixture: ComponentFixture<ListaProjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
