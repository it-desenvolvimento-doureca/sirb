import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoDashboardComponent } from './producao-dashboard.component';

describe('ProducaoDashboardComponent', () => {
  let component: ProducaoDashboardComponent;
  let fixture: ComponentFixture<ProducaoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducaoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducaoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
