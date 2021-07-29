import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunioesFormComponent } from './reunioes-form.component';

describe('ReunioesFormComponent', () => {
  let component: ReunioesFormComponent;
  let fixture: ComponentFixture<ReunioesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunioesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunioesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
