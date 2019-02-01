import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstbanhosformComponent } from './constbanhosform.component';

describe('ConstbanhosformComponent', () => {
  let component: ConstbanhosformComponent;
  let fixture: ComponentFixture<ConstbanhosformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstbanhosformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstbanhosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
