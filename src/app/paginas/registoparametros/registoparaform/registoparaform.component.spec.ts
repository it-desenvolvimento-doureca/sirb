import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoparaformComponent } from './registoparaform.component';

describe('RegistoparaformComponent', () => {
  let component: RegistoparaformComponent;
  let fixture: ComponentFixture<RegistoparaformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistoparaformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistoparaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
