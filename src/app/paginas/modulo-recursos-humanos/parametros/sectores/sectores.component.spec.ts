import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectoresComponent } from './sectores.component';

describe('SectoresComponent', () => {
  let component: SectoresComponent;
  let fixture: ComponentFixture<SectoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
