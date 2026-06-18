import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ShowcaseComponent } from './showcase.component';
import { ShowcaseModule } from './showcase.module';
import { ToastService } from '../core/services/toast.service';

describe('ShowcaseComponent', () => {
  beforeEach(() => MockBuilder(ShowcaseComponent, ShowcaseModule)
    .keep(ReactiveFormsModule)
    .keep(FormBuilder)
    .provide(MockProvider(ToastService)));

  it('should create', () => {
    expect(MockRender(ShowcaseComponent).point.componentInstance).toBeTruthy();
  });
});
