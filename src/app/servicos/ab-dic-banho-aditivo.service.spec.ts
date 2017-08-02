import { TestBed, inject } from '@angular/core/testing';

import { ABDICBANHOADITIVOService } from './ab-dic-banho-aditivo.service';

describe('ABDICBANHOADITIVOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICBANHOADITIVOService]
    });
  });

  it('should be created', inject([ABDICBANHOADITIVOService], (service: ABDICBANHOADITIVOService) => {
    expect(service).toBeTruthy();
  }));
});
