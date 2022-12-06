import { TestBed, inject } from '@angular/core/testing';

import { MANDICTIPOLOGIAAVARIAService } from './man-dic-tipologia-avaria.service';

describe('MANDICTIPOLOGIAAVARIAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANDICTIPOLOGIAAVARIAService]
    });
  });

  it('should be created', inject([MANDICTIPOLOGIAAVARIAService], (service: MANDICTIPOLOGIAAVARIAService) => {
    expect(service).toBeTruthy();
  }));
});
