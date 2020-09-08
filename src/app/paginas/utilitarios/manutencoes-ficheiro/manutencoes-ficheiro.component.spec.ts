import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencoesFicheiroComponent } from './manutencoes-ficheiro.component';

describe('ManutencoesFicheiroComponent', () => {
  let component: ManutencoesFicheiroComponent;
  let fixture: ComponentFixture<ManutencoesFicheiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManutencoesFicheiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencoesFicheiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
