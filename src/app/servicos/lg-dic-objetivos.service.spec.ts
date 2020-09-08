import { TestBed, inject } from '@angular/core/testing';

import { LGDICOBJETIVOSService } from './lg-dic-objetivos.service';

describe('LGDICOBJETIVOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LGDICOBJETIVOSService]
    });
  });

  it('should be created', inject([LGDICOBJETIVOSService], (service: LGDICOBJETIVOSService) => {
    expect(service).toBeTruthy();
  }));
});
