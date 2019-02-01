import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfComponent } from './conf.component';

describe('ConfComponent', () => {
  let component: ConfComponent;
  let fixture: ComponentFixture<ConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
