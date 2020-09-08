import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducoesPrioritariasComponent } from './producoes-prioritarias.component';

describe('ProducoesPrioritariasComponent', () => {
  let component: ProducoesPrioritariasComponent;
  let fixture: ComponentFixture<ProducoesPrioritariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducoesPrioritariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducoesPrioritariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
