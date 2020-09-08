import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectoresAnaliseComponent } from './sectores-analise.component';

describe('SectoresAnaliseComponent', () => {
  let component: SectoresAnaliseComponent;
  let fixture: ComponentFixture<SectoresAnaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectoresAnaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectoresAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
