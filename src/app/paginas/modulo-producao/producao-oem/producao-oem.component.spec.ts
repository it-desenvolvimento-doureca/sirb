import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoOemComponent } from './producao-oem.component';

describe('ProducaoOemComponent', () => {
  let component: ProducaoOemComponent;
  let fixture: ComponentFixture<ProducaoOemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducaoOemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducaoOemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
