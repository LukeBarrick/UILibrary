import { MockBuilder, MockRender } from 'ng-mocks';

import { NavigationOptionComponent } from './navigation-option.component';
import { NavigationModule } from '../navigation.module';

describe('NavigationOptionComponent', () => {
  beforeEach(() => MockBuilder(NavigationOptionComponent, NavigationModule));

  it('should create', () => {
    expect(MockRender(NavigationOptionComponent).point.componentInstance).toBeTruthy();
  });
});
