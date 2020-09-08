import { TestBed, inject } from '@angular/core/testing';

import { GERDICPROJFABService } from './ger-dic-proj-fab.service';

describe('GERDICPROJFABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDICPROJFABService]
    });
  });

  it('should be created', inject([GERDICPROJFABService], (service: GERDICPROJFABService) => {
    expect(service).toBeTruthy();
  }));
});
