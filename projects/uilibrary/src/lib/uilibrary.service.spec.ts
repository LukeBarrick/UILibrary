import { TestBed } from '@angular/core/testing';

import { UilibraryService } from './uilibrary.service';

describe('UilibraryService', () => {
  let service: UilibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UilibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
