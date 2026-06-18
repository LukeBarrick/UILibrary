import { MockBuilder, MockRender } from 'ng-mocks';

import { StatusTagComponent } from './status-tag.component';
import { StatusTagsModule } from '../status-tags.module';

describe('StatusTagComponent', () => {
  beforeEach(() => MockBuilder(StatusTagComponent, StatusTagsModule));

  it('should create', () => {
    expect(MockRender(StatusTagComponent).point.componentInstance).toBeTruthy();
  });
});
