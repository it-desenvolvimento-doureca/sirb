import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaPreventivasComponent } from './mapa-preventivas.component';

describe('MapaPreventivasComponent', () => {
  let component: MapaPreventivasComponent;
  let fixture: ComponentFixture<MapaPreventivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaPreventivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaPreventivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
