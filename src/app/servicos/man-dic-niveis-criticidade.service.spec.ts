import { TestBed, inject } from '@angular/core/testing';

import { MANDICNIVEISCRITICIDADEService } from './man-dic-niveis-criticidade.service';

describe('MANDICNIVEISCRITICIDADEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANDICNIVEISCRITICIDADEService]
    });
  });

  it('should be created', inject([MANDICNIVEISCRITICIDADEService], (service: MANDICNIVEISCRITICIDADEService) => {
    expect(service).toBeTruthy();
  }));
});
