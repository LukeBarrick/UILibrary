import { MockBuilder } from 'ng-mocks';
import { TestBed } from '@angular/core/testing';

import { UilibraryService } from './uilibrary.service';

describe('UilibraryService', () => {
  beforeEach(() => MockBuilder([UilibraryService]));

  it('should be created', () => {
    expect(TestBed.inject(UilibraryService)).toBeTruthy();
  });
});
