import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisComponent } from './epis.component';

describe('EpisComponent', () => {
  let component: EpisComponent;
  let fixture: ComponentFixture<EpisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
