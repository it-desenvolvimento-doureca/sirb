import { TestBed, inject } from '@angular/core/testing';

import { GTMOVFICHEIROSService } from './gt-mov-ficheiros.service';

describe('GTMOVFICHEIROSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GTMOVFICHEIROSService]
    });
  });

  it('should be created', inject([GTMOVFICHEIROSService], (service: GTMOVFICHEIROSService) => {
    expect(service).toBeTruthy();
  }));
});
