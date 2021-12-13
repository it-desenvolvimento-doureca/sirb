import { TestBed, inject } from '@angular/core/testing';

import { COMREFERENCIASSILVERService } from './com-referencias-silver.service';

describe('COMREFERENCIASSILVERService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMREFERENCIASSILVERService]
    });
  });

  it('should be created', inject([COMREFERENCIASSILVERService], (service: COMREFERENCIASSILVERService) => {
    expect(service).toBeTruthy();
  }));
});
