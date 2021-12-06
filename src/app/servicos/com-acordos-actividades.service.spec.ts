import { TestBed, inject } from '@angular/core/testing';

import { COMACORDOSACTIVIDADESService } from './com-acordos-actividades.service';

describe('COMACORDOSACTIVIDADESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMACORDOSACTIVIDADESService]
    });
  });

  it('should be created', inject([COMACORDOSACTIVIDADESService], (service: COMACORDOSACTIVIDADESService) => {
    expect(service).toBeTruthy();
  }));
});
