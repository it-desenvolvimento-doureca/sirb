import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtlformComponent } from './utlform.component';

describe('UtlformComponent', () => {
  let component: UtlformComponent;
  let fixture: ComponentFixture<UtlformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtlformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtlformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
