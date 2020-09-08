import { TestBed, inject } from '@angular/core/testing';

import { RCDICGRAUIMPORTANCIAService } from './rc-dic-grau-importancia.service';

describe('RCDICGRAUIMPORTANCIAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCDICGRAUIMPORTANCIAService]
    });
  });

  it('should be created', inject([RCDICGRAUIMPORTANCIAService], (service: RCDICGRAUIMPORTANCIAService) => {
    expect(service).toBeTruthy();
  }));
});
