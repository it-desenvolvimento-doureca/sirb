import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaeventostempComponent } from './listaeventostemp.component';

describe('ListaeventostempComponent', () => {
  let component: ListaeventostempComponent;
  let fixture: ComponentFixture<ListaeventostempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaeventostempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaeventostempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
