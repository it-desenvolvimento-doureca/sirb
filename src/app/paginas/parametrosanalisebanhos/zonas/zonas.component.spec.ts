import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasComponent } from './zonas.component';

describe('ZonasComponent', () => {
  let component: ZonasComponent;
  let fixture: ComponentFixture<ZonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
