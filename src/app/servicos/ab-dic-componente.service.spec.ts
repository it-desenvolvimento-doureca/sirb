import { TestBed, inject } from '@angular/core/testing';

import { ABDICCOMPONENTEService } from './ab-dic-componente.service';

describe('ABDICCOMPONENTEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICCOMPONENTEService]
    });
  });

  it('should be created', inject([ABDICCOMPONENTEService], (service: ABDICCOMPONENTEService) => {
    expect(service).toBeTruthy();
  }));
});
