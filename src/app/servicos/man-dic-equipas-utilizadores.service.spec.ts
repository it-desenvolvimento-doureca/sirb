import { TestBed, inject } from '@angular/core/testing';

import { MANDICEQUIPASUTILIZADORESService } from './man-dic-equipas-utilizadores.service';

describe('MANDICEQUIPASUTILIZADORESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANDICEQUIPASUTILIZADORESService]
    });
  });

  it('should be created', inject([MANDICEQUIPASUTILIZADORESService], (service: MANDICEQUIPASUTILIZADORESService) => {
    expect(service).toBeTruthy();
  }));
});
