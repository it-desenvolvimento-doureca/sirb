import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosificadoresComponent } from './dosificadores.component';

describe('DosificadoresComponent', () => {
  let component: DosificadoresComponent;
  let fixture: ComponentFixture<DosificadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosificadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosificadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
