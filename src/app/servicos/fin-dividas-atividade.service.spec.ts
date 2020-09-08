import { TestBed, inject } from '@angular/core/testing';

import { FINDIVIDASATIVIDADEService } from './fin-dividas-atividade.service';

describe('FINDIVIDASATIVIDADEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FINDIVIDASATIVIDADEService]
    });
  });

  it('should be created', inject([FINDIVIDASATIVIDADEService], (service: FINDIVIDASATIVIDADEService) => {
    expect(service).toBeTruthy();
  }));
});
