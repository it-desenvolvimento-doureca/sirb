import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoformComponent } from './manutencaoform.component';

describe('ManutencaoformComponent', () => {
  let component: ManutencaoformComponent;
  let fixture: ComponentFixture<ManutencaoformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManutencaoformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
