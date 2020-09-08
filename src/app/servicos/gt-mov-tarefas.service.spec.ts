import { TestBed, inject } from '@angular/core/testing';

import { GTMOVTAREFASService } from './gt-mov-tarefas.service';

describe('GTMOVTAREFASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GTMOVTAREFASService]
    });
  });

  it('should be created', inject([GTMOVTAREFASService], (service: GTMOVTAREFASService) => {
    expect(service).toBeTruthy();
  }));
});
