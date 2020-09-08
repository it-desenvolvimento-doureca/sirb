import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControloAssiduidadeComponent } from './controlo-assiduidade.component';

describe('ControloAssiduidadeComponent', () => {
  let component: ControloAssiduidadeComponent;
  let fixture: ComponentFixture<ControloAssiduidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControloAssiduidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControloAssiduidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
