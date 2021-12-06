import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordosFormComponent } from './acordos-form.component';

describe('AcordosFormComponent', () => {
  let component: AcordosFormComponent;
  let fixture: ComponentFixture<AcordosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcordosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcordosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
