import { TestBed, inject } from '@angular/core/testing';

import { ABDICTURNOService } from './ab-dic-turno.service';

describe('ABDICTURNOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICTURNOService]
    });
  });

  it('should be created', inject([ABDICTURNOService], (service: ABDICTURNOService) => {
    expect(service).toBeTruthy();
  }));
});
