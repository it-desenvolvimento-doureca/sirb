import { TestBed, inject } from '@angular/core/testing';

import { RelatoriosService } from './relatorios.service';

describe('RelatoriosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatoriosService]
    });
  });

  it('should be created', inject([RelatoriosService], (service: RelatoriosService) => {
    expect(service).toBeTruthy();
  }));
});
