import { TestBed, inject } from '@angular/core/testing';

import { MANDICEDIFICIOSService } from './man-dic-edificios.service';

describe('MANDICEDIFICIOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANDICEDIFICIOSService]
    });
  });

  it('should be created', inject([MANDICEDIFICIOSService], (service: MANDICEDIFICIOSService) => {
    expect(service).toBeTruthy();
  }));
});
