import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrecaoquantidadesComponent } from './correcaoquantidades.component';

describe('CorrecaoquantidadesComponent', () => {
  let component: CorrecaoquantidadesComponent;
  let fixture: ComponentFixture<CorrecaoquantidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrecaoquantidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrecaoquantidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
