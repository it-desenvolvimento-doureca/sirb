import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaapcidadeRacksComponent } from './caapcidade-racks.component';

describe('CaapcidadeRacksComponent', () => {
  let component: CaapcidadeRacksComponent;
  let fixture: ComponentFixture<CaapcidadeRacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaapcidadeRacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaapcidadeRacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
