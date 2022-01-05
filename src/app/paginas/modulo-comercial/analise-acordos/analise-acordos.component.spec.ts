import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseAcordosComponent } from './analise-acordos.component';

describe('AnaliseAcordosComponent', () => {
  let component: AnaliseAcordosComponent;
  let fixture: ComponentFixture<AnaliseAcordosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseAcordosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseAcordosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
