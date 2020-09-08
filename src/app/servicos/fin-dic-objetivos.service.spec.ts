import { TestBed, inject } from '@angular/core/testing';

import { FINDICOBJETIVOSService } from './fin-dic-objetivos.service';

describe('FINDICOBJETIVOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FINDICOBJETIVOSService]
    });
  });

  it('should be created', inject([FINDICOBJETIVOSService], (service: FINDICOBJETIVOSService) => {
    expect(service).toBeTruthy();
  }));
});
