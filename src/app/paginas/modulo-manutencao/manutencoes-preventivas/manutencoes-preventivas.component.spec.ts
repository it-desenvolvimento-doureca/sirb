import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencoesPreventivasComponent } from './manutencoes-preventivas.component';

describe('ManutencoesPreventivasComponent', () => {
  let component: ManutencoesPreventivasComponent;
  let fixture: ComponentFixture<ManutencoesPreventivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManutencoesPreventivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencoesPreventivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
