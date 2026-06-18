import { MockBuilder, MockRender } from 'ng-mocks';

import { TooltipComponent } from './tooltip.component';
import { InputAnnotationsModule } from '../input-annotations.module';

describe('TooltipComponent', () => {
  beforeEach(() => MockBuilder(TooltipComponent, InputAnnotationsModule));

  it('should create', () => {
    expect(MockRender(TooltipComponent).point.componentInstance).toBeTruthy();
  });
});
