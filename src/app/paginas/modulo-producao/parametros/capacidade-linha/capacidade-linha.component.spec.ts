import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadeLinhaComponent } from './capacidade-linha.component';

describe('CapacidadeLinhaComponent', () => {
  let component: CapacidadeLinhaComponent;
  let fixture: ComponentFixture<CapacidadeLinhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacidadeLinhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadeLinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
