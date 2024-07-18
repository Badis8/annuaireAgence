import { TestBed } from '@angular/core/testing';

import { OnClickHandlerService } from './on-click-handler.service';

describe('OnClickHandlerService', () => {
  let service: OnClickHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnClickHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
