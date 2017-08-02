import { TestBed, inject } from '@angular/core/testing';

import { ABDICLINHAService } from './ab-dic-linha.service';

describe('ABDICLINHAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICLINHAService]
    });
  });

  it('should be created', inject([ABDICLINHAService], (service: ABDICLINHAService) => {
    expect(service).toBeTruthy();
  }));
});
