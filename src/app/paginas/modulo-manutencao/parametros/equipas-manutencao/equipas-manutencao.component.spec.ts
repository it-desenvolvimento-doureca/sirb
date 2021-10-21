import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipasManutencaoComponent } from './equipas-manutencao.component';

describe('EquipasManutencaoComponent', () => {
  let component: EquipasManutencaoComponent;
  let fixture: ComponentFixture<EquipasManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipasManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipasManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
