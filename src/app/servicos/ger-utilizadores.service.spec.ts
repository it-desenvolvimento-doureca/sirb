import { TestBed, inject } from '@angular/core/testing';

import { GERUTILIZADORESService } from './ger-utilizadores.service';

describe('GERUTILIZADORESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERUTILIZADORESService]
    });
  });

  it('should be created', inject([GERUTILIZADORESService], (service: GERUTILIZADORESService) => {
    expect(service).toBeTruthy();
  }));
});
