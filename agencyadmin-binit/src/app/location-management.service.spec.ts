import { TestBed } from '@angular/core/testing';

import { AgencyLocationManagementService } from './location-management.service';

describe('LocationManagementService', () => {
  let service: AgencyLocationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyLocationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
