import { TestBed, inject } from '@angular/core/testing';

import { GERUTZPERFILService } from './ger-utz-perfil.service';

describe('GERUTZPERFILService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERUTZPERFILService]
    });
  });

  it('should be created', inject([GERUTZPERFILService], (service: GERUTZPERFILService) => {
    expect(service).toBeTruthy();
  }));
});
