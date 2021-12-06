import { TestBed, inject } from '@angular/core/testing';

import { COMREFERENCIASService } from './com-referencias.service';

describe('COMREFERENCIASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMREFERENCIASService]
    });
  });

  it('should be created', inject([COMREFERENCIASService], (service: COMREFERENCIASService) => {
    expect(service).toBeTruthy();
  }));
});
