import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanhosComponent } from './banhos.component';

describe('BanhosComponent', () => {
  let component: BanhosComponent;
  let fixture: ComponentFixture<BanhosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanhosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
