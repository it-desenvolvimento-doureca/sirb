import { TestBed, inject } from '@angular/core/testing';

import { ABDICBANHOCOMPONENTEService } from './ab-dic-banho-componente.service';

describe('ABDICBANHOCOMPONENTEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICBANHOCOMPONENTEService]
    });
  });

  it('should be created', inject([ABDICBANHOCOMPONENTEService], (service: ABDICBANHOCOMPONENTEService) => {
    expect(service).toBeTruthy();
  }));
});
