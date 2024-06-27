import { TestBed } from '@angular/core/testing';

import { ShitesService } from './shites.service';

describe('ShitesService', () => {
  let service: ShitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
