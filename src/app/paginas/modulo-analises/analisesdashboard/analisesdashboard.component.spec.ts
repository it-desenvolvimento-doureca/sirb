import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisesdashboardComponent } from './analisesdashboard.component';

describe('AnalisesdashboardComponent', () => {
  let component: AnalisesdashboardComponent;
  let fixture: ComponentFixture<AnalisesdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisesdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
