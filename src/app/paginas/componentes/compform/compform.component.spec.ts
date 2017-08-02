import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompformComponent } from './compform.component';

describe('CompformComponent', () => {
  let component: CompformComponent;
  let fixture: ComponentFixture<CompformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
