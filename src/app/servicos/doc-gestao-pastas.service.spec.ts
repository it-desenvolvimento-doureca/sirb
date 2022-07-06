import { TestBed, inject } from '@angular/core/testing';

import { DOCGESTAOPASTASService } from './doc-gestao-pastas.service';

describe('DOCGESTAOPASTASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DOCGESTAOPASTASService]
    });
  });

  it('should be created', inject([DOCGESTAOPASTASService], (service: DOCGESTAOPASTASService) => {
    expect(service).toBeTruthy();
  }));
});
