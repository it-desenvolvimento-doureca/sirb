import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelControloViewComponent } from './painel-controlo-view.component';

describe('PainelControloViewComponent', () => {
  let component: PainelControloViewComponent;
  let fixture: ComponentFixture<PainelControloViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelControloViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelControloViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
