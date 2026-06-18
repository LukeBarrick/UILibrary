import { MockBuilder, MockRender } from 'ng-mocks';

import { HintComponent } from './hint.component';
import { InputAnnotationsModule } from '../input-annotations.module';

describe('HintComponent', () => {
  beforeEach(() => MockBuilder(HintComponent, InputAnnotationsModule));

  it('should create', () => {
    expect(MockRender(HintComponent).point.componentInstance).toBeTruthy();
  });
});
