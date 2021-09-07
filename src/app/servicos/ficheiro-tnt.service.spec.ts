import { TestBed, inject } from '@angular/core/testing';

import { FICHEIROTNTService } from './ficheiro-tnt.service';

describe('FICHEIROTNTService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FICHEIROTNTService]
    });
  });

  it('should be created', inject([FICHEIROTNTService], (service: FICHEIROTNTService) => {
    expect(service).toBeTruthy();
  }));
});
