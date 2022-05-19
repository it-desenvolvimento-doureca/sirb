import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostosDocumentacaoComponent } from './postos-documentacao.component';

describe('PostosDocumentacaoComponent', () => {
  let component: PostosDocumentacaoComponent;
  let fixture: ComponentFixture<PostosDocumentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostosDocumentacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostosDocumentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
