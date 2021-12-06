import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordosComponent } from './acordos.component';

describe('AcordosComponent', () => {
  let component: AcordosComponent;
  let fixture: ComponentFixture<AcordosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcordosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcordosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
