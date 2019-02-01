import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseconsumosComponent } from './analiseconsumos.component';

describe('AnaliseconsumosComponent', () => {
  let component: AnaliseconsumosComponent;
  let fixture: ComponentFixture<AnaliseconsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseconsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseconsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
