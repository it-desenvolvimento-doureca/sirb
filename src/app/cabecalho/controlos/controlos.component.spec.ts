import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlosComponent } from './controlos.component';

describe('ControlosComponent', () => {
  let component: ControlosComponent;
  let fixture: ComponentFixture<ControlosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
