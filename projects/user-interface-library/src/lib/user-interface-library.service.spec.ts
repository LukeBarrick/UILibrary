import { TestBed } from '@angular/core/testing';

import { UserInterfaceLibraryService } from './user-interface-library.service';

describe('UserInterfaceLibraryService', () => {
  let service: UserInterfaceLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInterfaceLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
