import { MockBuilder, MockRender } from 'ng-mocks';

import { NavigationDropdownComponent } from './navigation-dropdown.component';
import { NavigationModule } from '../navigation.module';

describe('NavigationDropdownComponent', () => {
  beforeEach(() => MockBuilder(NavigationDropdownComponent, NavigationModule));

  it('should create', () => {
    expect(MockRender(NavigationDropdownComponent).point.componentInstance).toBeTruthy();
  });
});
