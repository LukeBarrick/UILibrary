import { MockBuilder, MockRender } from 'ng-mocks';

import { UilibraryComponent } from './uilibrary.component';
import { UilibraryModule } from './uilibrary.module';

describe('UilibraryComponent', () => {
  beforeEach(() => MockBuilder(UilibraryComponent, UilibraryModule));

  it('should create', () => {
    expect(MockRender(UilibraryComponent).point.componentInstance).toBeTruthy();
  });
});
