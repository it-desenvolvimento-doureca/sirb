import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoformComponent } from './registoform.component';

describe('RegistoformComponent', () => {
  let component: RegistoformComponent;
  let fixture: ComponentFixture<RegistoformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistoformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
