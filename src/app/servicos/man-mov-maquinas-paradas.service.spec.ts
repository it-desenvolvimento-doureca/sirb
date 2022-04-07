import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMAQUINASPARADASService } from './man-mov-maquinas-paradas.service';

describe('MANMOVMAQUINASPARADASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMAQUINASPARADASService]
    });
  });

  it('should be created', inject([MANMOVMAQUINASPARADASService], (service: MANMOVMAQUINASPARADASService) => {
    expect(service).toBeTruthy();
  }));
});
