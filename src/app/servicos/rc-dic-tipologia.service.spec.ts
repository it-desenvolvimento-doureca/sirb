import { TestBed, inject } from '@angular/core/testing';

import { RCDICTIPOLOGIAService } from './rc-dic-tipologia.service';

describe('RCDICTIPOLOGIAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCDICTIPOLOGIAService]
    });
  });

  it('should be created', inject([RCDICTIPOLOGIAService], (service: RCDICTIPOLOGIAService) => {
    expect(service).toBeTruthy();
  }));
});
