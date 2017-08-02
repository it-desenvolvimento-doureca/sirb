import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoparametrosComponent } from './registoparametros.component';

describe('RegistoparametrosComponent', () => {
  let component: RegistoparametrosComponent;
  let fixture: ComponentFixture<RegistoparametrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistoparametrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistoparametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
