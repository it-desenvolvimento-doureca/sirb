import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveisCriticidadeComponent } from './niveis-criticidade.component';

describe('NiveisCriticidadeComponent', () => {
  let component: NiveisCriticidadeComponent;
  let fixture: ComponentFixture<NiveisCriticidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiveisCriticidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveisCriticidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
