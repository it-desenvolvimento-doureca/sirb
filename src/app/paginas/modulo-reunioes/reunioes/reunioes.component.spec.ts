import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunioesComponent } from './reunioes.component';

describe('ReunioesComponent', () => {
  let component: ReunioesComponent;
  let fixture: ComponentFixture<ReunioesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunioesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
