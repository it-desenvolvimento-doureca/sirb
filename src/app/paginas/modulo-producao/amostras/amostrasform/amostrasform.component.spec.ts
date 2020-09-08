import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmostrasformComponent } from './amostrasform.component';

describe('AmostrasformComponent', () => {
  let component: AmostrasformComponent;
  let fixture: ComponentFixture<AmostrasformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmostrasformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmostrasformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
