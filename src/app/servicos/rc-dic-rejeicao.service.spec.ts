import { TestBed, inject } from '@angular/core/testing';

import { RCDICREJEICAOService } from './rc-dic-rejeicao.service';

describe('RCDICREJEICAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCDICREJEICAOService]
    });
  });

  it('should be created', inject([RCDICREJEICAOService], (service: RCDICREJEICAOService) => {
    expect(service).toBeTruthy();
  }));
});
