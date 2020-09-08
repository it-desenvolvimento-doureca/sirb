import { TestBed, inject } from '@angular/core/testing';

import { PLANEAMENTOCABService } from './planeamento-cab.service';

describe('PLANEAMENTOCABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PLANEAMENTOCABService]
    });
  });

  it('should be created', inject([PLANEAMENTOCABService], (service: PLANEAMENTOCABService) => {
    expect(service).toBeTruthy();
  }));
});
