import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacifosComponent } from './cacifos.component';

describe('CacifosComponent', () => {
  let component: CacifosComponent;
  let fixture: ComponentFixture<CacifosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacifosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacifosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
