import { TestBed, inject } from '@angular/core/testing';

import { GERFERIADOSService } from './ger-feriados.service';

describe('GERFERIADOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERFERIADOSService]
    });
  });

  it('should be created', inject([GERFERIADOSService], (service: GERFERIADOSService) => {
    expect(service).toBeTruthy();
  }));
});
