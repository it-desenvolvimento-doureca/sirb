import { TestBed, inject } from '@angular/core/testing';

import { GERREFERENCIASFASTRESPONSEREJEICOESService } from './ger-referencias-fastresponse-rejeicoes.service';

describe('GERREFERENCIASFASTRESPONSEREJEICOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERREFERENCIASFASTRESPONSEREJEICOESService]
    });
  });

  it('should be created', inject([GERREFERENCIASFASTRESPONSEREJEICOESService], (service: GERREFERENCIASFASTRESPONSEREJEICOESService) => {
    expect(service).toBeTruthy();
  }));
});
