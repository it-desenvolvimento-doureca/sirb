import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacoesAlfrescoComponent } from './localizacoes-alfresco.component';

describe('LocalizacoesAlfrescoComponent', () => {
  let component: LocalizacoesAlfrescoComponent;
  let fixture: ComponentFixture<LocalizacoesAlfrescoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacoesAlfrescoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizacoesAlfrescoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
