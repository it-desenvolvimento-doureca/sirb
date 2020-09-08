import { TestBed, inject } from '@angular/core/testing';

import { GERARMAZEMService } from './ger-armazem.service';

describe('GERARMAZEMService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERARMAZEMService]
    });
  });

  it('should be created', inject([GERARMAZEMService], (service: GERARMAZEMService) => {
    expect(service).toBeTruthy();
  }));
});
