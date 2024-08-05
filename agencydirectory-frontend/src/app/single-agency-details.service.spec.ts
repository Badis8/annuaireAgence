import { TestBed } from '@angular/core/testing';

import { SingleAgencyDetailsService } from './single-agency-details.service';

describe('SingleAgencyDetailsService', () => {
  let service: SingleAgencyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleAgencyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
