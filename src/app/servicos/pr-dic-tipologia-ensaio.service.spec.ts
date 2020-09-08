import { TestBed, inject } from '@angular/core/testing';

import { PRDICTIPOLOGIAENSAIOService } from './pr-dic-tipologia-ensaio.service';

describe('PRDICTIPOLOGIAENSAIOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICTIPOLOGIAENSAIOService]
    });
  });

  it('should be created', inject([PRDICTIPOLOGIAENSAIOService], (service: PRDICTIPOLOGIAENSAIOService) => {
    expect(service).toBeTruthy();
  }));
});
