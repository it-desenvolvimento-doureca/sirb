import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinasformComponent } from './tinasform.component';

describe('TinasformComponent', () => {
  let component: TinasformComponent;
  let fixture: ComponentFixture<TinasformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinasformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinasformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
