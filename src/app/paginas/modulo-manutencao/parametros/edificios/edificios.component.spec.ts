import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificiosComponent } from './edificios.component';

describe('EdificiosComponent', () => {
  let component: EdificiosComponent;
  let fixture: ComponentFixture<EdificiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdificiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
