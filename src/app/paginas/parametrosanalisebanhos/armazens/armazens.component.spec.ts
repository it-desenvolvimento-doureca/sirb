import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazensComponent } from './armazens.component';

describe('ArmazensComponent', () => {
  let component: ArmazensComponent;
  let fixture: ComponentFixture<ArmazensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmazensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmazensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
