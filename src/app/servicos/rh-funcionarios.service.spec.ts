import { TestBed, inject } from '@angular/core/testing';

import { RHFUNCIONARIOSService } from './rh-funcionarios.service';

describe('RHFUNCIONARIOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHFUNCIONARIOSService]
    });
  });

  it('should be created', inject([RHFUNCIONARIOSService], (service: RHFUNCIONARIOSService) => {
    expect(service).toBeTruthy();
  }));
});
