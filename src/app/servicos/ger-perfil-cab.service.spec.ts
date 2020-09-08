import { TestBed, inject } from '@angular/core/testing';

import { GERPERFILCABService } from './ger-perfil-cab.service';

describe('GERPERFILCABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERPERFILCABService]
    });
  });

  it('should be created', inject([GERPERFILCABService], (service: GERPERFILCABService) => {
    expect(service).toBeTruthy();
  }));
});
