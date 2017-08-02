import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhasComponent } from './linhas.component';

describe('LinhasComponent', () => {
  let component: LinhasComponent;
  let fixture: ComponentFixture<LinhasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
