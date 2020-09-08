import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoProgramaComponent } from './producao-programa.component';

describe('ProducaoProgramaComponent', () => {
  let component: ProducaoProgramaComponent;
  let fixture: ComponentFixture<ProducaoProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducaoProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducaoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
