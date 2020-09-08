import { TestBed, inject } from '@angular/core/testing';

import { FINDICTIPODOCService } from './fin-dic-tipo-doc.service';

describe('FINDICTIPODOCService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FINDICTIPODOCService]
    });
  });

  it('should be created', inject([FINDICTIPODOCService], (service: FINDICTIPODOCService) => {
    expect(service).toBeTruthy();
  }));
});
