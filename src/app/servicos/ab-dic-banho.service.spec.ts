import { TestBed, inject } from '@angular/core/testing';

import { ABDICBANHOService } from './ab-dic-banho.service';

describe('ABDICBANHOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICBANHOService]
    });
  });

  it('should be created', inject([ABDICBANHOService], (service: ABDICBANHOService) => {
    expect(service).toBeTruthy();
  }));
});
