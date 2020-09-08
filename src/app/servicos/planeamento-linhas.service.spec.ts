import { TestBed, inject } from '@angular/core/testing';

import { PLANEAMENTOLINHASService } from './planeamento-linhas.service';

describe('PLANEAMENTOLINHASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PLANEAMENTOLINHASService]
    });
  });

  it('should be created', inject([PLANEAMENTOLINHASService], (service: PLANEAMENTOLINHASService) => {
    expect(service).toBeTruthy();
  }));
});
