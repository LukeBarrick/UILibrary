import { MockBuilder, MockRender } from 'ng-mocks';

import { ButtonLinkComponent } from './button-link.component';
import { ButtonModule } from '../button.module';

describe('ButtonLinkComponent', () => {
  beforeEach(() => MockBuilder(ButtonLinkComponent, ButtonModule));

  it('should create', () => {
    expect(MockRender(ButtonLinkComponent).point.componentInstance).toBeTruthy();
  });
});
