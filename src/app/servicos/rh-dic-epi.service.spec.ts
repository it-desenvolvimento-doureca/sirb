import { TestBed, inject } from '@angular/core/testing';

import { RHDICEPIService } from './rh-dic-epi.service';

describe('RHDICEPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHDICEPIService]
    });
  });

  it('should be created', inject([RHDICEPIService], (service: RHDICEPIService) => {
    expect(service).toBeTruthy();
  }));
});
