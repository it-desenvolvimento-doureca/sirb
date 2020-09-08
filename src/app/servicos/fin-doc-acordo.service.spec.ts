import { TestBed, inject } from '@angular/core/testing';

import { FINDOCACORDOService } from './fin-doc-acordo.service';

describe('FINDOCACORDOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FINDOCACORDOService]
    });
  });

  it('should be created', inject([FINDOCACORDOService], (service: FINDOCACORDOService) => {
    expect(service).toBeTruthy();
  }));
});
