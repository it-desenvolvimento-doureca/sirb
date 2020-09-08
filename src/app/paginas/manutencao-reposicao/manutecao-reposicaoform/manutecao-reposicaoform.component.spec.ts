import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutecaoReposicaoformComponent } from './manutecao-reposicaoform.component';

describe('ManutecaoReposicaoformComponent', () => {
  let component: ManutecaoReposicaoformComponent;
  let fixture: ComponentFixture<ManutecaoReposicaoformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManutecaoReposicaoformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutecaoReposicaoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
