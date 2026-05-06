import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting  } from "@angular/platform-browser/testing"
import { ngMocks } from 'ng-mocks';

// Configure ng-mocks to use Jasmine spies globally for all mocked methods.
ngMocks.autoSpy('jasmine');

// Bootstrap the Angular test environment once for the entire test suite.
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
  { teardown: { destroyAfterEach: true } },
);