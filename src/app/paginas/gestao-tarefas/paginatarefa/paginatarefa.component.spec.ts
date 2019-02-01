import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatarefaComponent } from './paginatarefa.component';

describe('PaginatarefaComponent', () => {
  let component: PaginatarefaComponent;
  let fixture: ComponentFixture<PaginatarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
