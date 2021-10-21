import { TestBed, inject } from '@angular/core/testing';

import { MANDICEQUIPASService } from './man-dic-equipas.service';

describe('MANDICEQUIPASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANDICEQUIPASService]
    });
  });

  it('should be created', inject([MANDICEQUIPASService], (service: MANDICEQUIPASService) => {
    expect(service).toBeTruthy();
  }));
});
