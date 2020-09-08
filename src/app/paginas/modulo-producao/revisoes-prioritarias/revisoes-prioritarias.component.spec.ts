import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisoesPrioritariasComponent } from './revisoes-prioritarias.component';

describe('RevisoesPrioritariasComponent', () => {
  let component: RevisoesPrioritariasComponent;
  let fixture: ComponentFixture<RevisoesPrioritariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisoesPrioritariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisoesPrioritariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
