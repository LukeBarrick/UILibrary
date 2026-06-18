import { Component } from '@angular/core';
import { MockBuilder, MockRender } from 'ng-mocks';

import { InputComponent } from './input.component';
import { InputModule } from './input.module';

@Component({ standalone: false, template: `<input ui-input />` })
class TestHostComponent {}

describe('InputComponent', () => {
  beforeEach(() => MockBuilder([TestHostComponent, InputComponent], InputModule));

  it('should create', () => {
    expect(MockRender(TestHostComponent).point.componentInstance).toBeTruthy();
  });
});
