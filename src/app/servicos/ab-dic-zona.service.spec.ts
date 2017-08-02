import { TestBed, inject } from '@angular/core/testing';

import { ABDICZONAService } from './ab-dic-zona.service';

describe('ABDICZONAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICZONAService]
    });
  });

  it('should be created', inject([ABDICZONAService], (service: ABDICZONAService) => {
    expect(service).toBeTruthy();
  }));
});
