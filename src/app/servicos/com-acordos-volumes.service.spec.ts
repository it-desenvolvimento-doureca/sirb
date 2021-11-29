import { TestBed, inject } from '@angular/core/testing';

import { COMACORDOSVOLUMESService } from './com-acordos-volumes.service';

describe('COMACORDOSVOLUMESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMACORDOSVOLUMESService]
    });
  });

  it('should be created', inject([COMACORDOSVOLUMESService], (service: COMACORDOSVOLUMESService) => {
    expect(service).toBeTruthy();
  }));
});
