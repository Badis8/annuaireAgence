import { TestBed } from '@angular/core/testing';

import { AgencyManagementService } from './agency-management.service';

describe('AgencyManagementService', () => {
  let service: AgencyManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
