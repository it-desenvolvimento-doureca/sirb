import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmostrasComponent } from './amostras.component';

describe('AmostrasComponent', () => {
  let component: AmostrasComponent;
  let fixture: ComponentFixture<AmostrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmostrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmostrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
