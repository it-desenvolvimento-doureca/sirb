import { TestBed, inject } from '@angular/core/testing';

import { FINDICCLIENTESService } from './fin-dic-clientes.service';

describe('FINDICCLIENTESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FINDICCLIENTESService]
    });
  });

  it('should be created', inject([FINDICCLIENTESService], (service: FINDICCLIENTESService) => {
    expect(service).toBeTruthy();
  }));
});
