import { TestBed, inject } from '@angular/core/testing';
import { GERDICPROJREFService } from './ger-dic-proj-ref.service';


describe('GERDICPROJREFService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDICPROJREFService]
    });
  });

  it('should be created', inject([GERDICPROJREFService], (service: GERDICPROJREFService) => {
    expect(service).toBeTruthy();
  }));
});
