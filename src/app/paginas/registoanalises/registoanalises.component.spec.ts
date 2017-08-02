import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoanalisesComponent } from './registoanalises.component';

describe('RegistoanalisesComponent', () => {
  let component: RegistoanalisesComponent;
  let fixture: ComponentFixture<RegistoanalisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistoanalisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistoanalisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
