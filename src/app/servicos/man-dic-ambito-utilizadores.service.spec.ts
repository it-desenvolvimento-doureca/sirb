import { TestBed, inject } from '@angular/core/testing';

import { MANDICAMBITOUTILIZADORESService } from './man-dic-ambito-utilizadores.service';

describe('MANDICAMBITOUTILIZADORESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANDICAMBITOUTILIZADORESService]
    });
  });

  it('should be created', inject([MANDICAMBITOUTILIZADORESService], (service: MANDICAMBITOUTILIZADORESService) => {
    expect(service).toBeTruthy();
  }));
});
