import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanasAnaliseComponent } from './semanas-analise.component';

describe('SemanasAnaliseComponent', () => {
  let component: SemanasAnaliseComponent;
  let fixture: ComponentFixture<SemanasAnaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanasAnaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanasAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
