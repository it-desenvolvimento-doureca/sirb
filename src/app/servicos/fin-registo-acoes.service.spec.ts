import { TestBed, inject } from '@angular/core/testing';

import { FINREGISTOACOESService } from './fin-registo-acoes.service';

describe('FINREGISTOACOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FINREGISTOACOESService]
    });
  });

  it('should be created', inject([FINREGISTOACOESService], (service: FINREGISTOACOESService) => {
    expect(service).toBeTruthy();
  }));
});
