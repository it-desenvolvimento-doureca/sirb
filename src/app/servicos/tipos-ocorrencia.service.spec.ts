import { TestBed, inject } from '@angular/core/testing';

import { TIPOSOCORRENCIAService } from './tipos-ocorrencia.service';

describe('TIPOSOCORRENCIAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TIPOSOCORRENCIAService]
    });
  });

  it('should be created', inject([TIPOSOCORRENCIAService], (service: TIPOSOCORRENCIAService) => {
    expect(service).toBeTruthy();
  }));
});
