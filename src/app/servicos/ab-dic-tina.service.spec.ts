import { TestBed, inject } from '@angular/core/testing';

import { ABDICTINAService } from './ab-dic-tina.service';

describe('ABDICTINAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICTINAService]
    });
  });

  it('should be created', inject([ABDICTINAService], (service: ABDICTINAService) => {
    expect(service).toBeTruthy();
  }));
});
