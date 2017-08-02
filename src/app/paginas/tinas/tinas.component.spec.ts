import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinasComponent } from './tinas.component';

describe('TinasComponent', () => {
  let component: TinasComponent;
  let fixture: ComponentFixture<TinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
