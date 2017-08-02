import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanhosformComponent } from './banhosform.component';

describe('BanhosformComponent', () => {
  let component: BanhosformComponent;
  let fixture: ComponentFixture<BanhosformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanhosformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanhosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
