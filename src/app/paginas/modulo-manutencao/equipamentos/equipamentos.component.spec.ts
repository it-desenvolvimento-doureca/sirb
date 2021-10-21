import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentosComponent } from './equipamentos.component';

describe('EquipamentosComponent', () => {
  let component: EquipamentosComponent;
  let fixture: ComponentFixture<EquipamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
