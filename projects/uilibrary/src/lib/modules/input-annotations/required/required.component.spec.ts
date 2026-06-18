import { MockBuilder, MockRender } from 'ng-mocks';

import { RequiredComponent } from './required.component';
import { InputAnnotationsModule } from '../input-annotations.module';

describe('RequiredComponent', () => {
  beforeEach(() => MockBuilder(RequiredComponent, InputAnnotationsModule));

  it('should create', () => {
    expect(MockRender(RequiredComponent).point.componentInstance).toBeTruthy();
  });
});
