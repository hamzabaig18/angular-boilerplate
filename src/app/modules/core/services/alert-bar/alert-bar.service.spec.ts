import { TestBed } from '@angular/core/testing';

import { AlertBarService } from './alert-bar.service';

describe('AlertBarService', () => {
  let service: AlertBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
