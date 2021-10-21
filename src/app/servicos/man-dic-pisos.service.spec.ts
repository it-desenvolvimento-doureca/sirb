import { TestBed, inject } from '@angular/core/testing';

import { MANDICPISOSService } from './man-dic-pisos.service';

describe('MANDICPISOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANDICPISOSService]
    });
  });

  it('should be created', inject([MANDICPISOSService], (service: MANDICPISOSService) => {
    expect(service).toBeTruthy();
  }));
});
