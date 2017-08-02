import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioViewerComponent } from './relatorio-viewer.component';

describe('RelatorioViewerComponent', () => {
  let component: RelatorioViewerComponent;
  let fixture: ComponentFixture<RelatorioViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
