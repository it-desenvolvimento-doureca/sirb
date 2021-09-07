import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseEnviosComponent } from './analise-envios.component';

describe('AnaliseEnviosComponent', () => {
  let component: AnaliseEnviosComponent;
  let fixture: ComponentFixture<AnaliseEnviosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseEnviosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
