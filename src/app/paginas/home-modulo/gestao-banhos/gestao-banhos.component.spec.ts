import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoBanhosComponent } from './gestao-banhos.component';

describe('GestaoBanhosComponent', () => {
  let component: GestaoBanhosComponent;
  let fixture: ComponentFixture<GestaoBanhosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoBanhosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoBanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
