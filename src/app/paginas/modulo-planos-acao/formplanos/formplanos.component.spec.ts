import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormplanosComponent } from './formplanos.component';

describe('FormplanosComponent', () => {
  let component: FormplanosComponent;
  let fixture: ComponentFixture<FormplanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormplanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormplanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
