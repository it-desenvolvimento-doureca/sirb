import { TestBed, inject } from '@angular/core/testing';

import { ABMOVMANUTENCAOETIQService } from './ab-mov-manutencao-etiq.service';

describe('ABMOVMANUTENCAOETIQService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABMOVMANUTENCAOETIQService]
    });
  });

  it('should be created', inject([ABMOVMANUTENCAOETIQService], (service: ABMOVMANUTENCAOETIQService) => {
    expect(service).toBeTruthy();
  }));
});
