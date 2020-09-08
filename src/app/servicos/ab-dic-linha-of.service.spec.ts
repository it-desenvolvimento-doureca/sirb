import { TestBed, inject } from '@angular/core/testing';

import { ABDICLINHAOFService } from './ab-dic-linha-of.service';

describe('ABDICLINHAOFService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICLINHAOFService]
    });
  });

  it('should be created', inject([ABDICLINHAOFService], (service: ABDICLINHAOFService) => {
    expect(service).toBeTruthy();
  }));
});
