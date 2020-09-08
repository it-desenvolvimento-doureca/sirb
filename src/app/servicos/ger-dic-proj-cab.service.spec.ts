import { TestBed, inject } from '@angular/core/testing';

import { GERDICPROJCABService } from './ger-dic-proj-cab.service';

describe('GERDICPROJCABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDICPROJCABService]
    });
  });

  it('should be created', inject([GERDICPROJCABService], (service: GERDICPROJCABService) => {
    expect(service).toBeTruthy();
  }));
});
