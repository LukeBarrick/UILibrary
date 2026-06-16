import { EnvironmentProviders, NgModule } from '@angular/core';
import { IconComponent } from './icon.component';
import { AngularSvgIconModule, provideAngularSvgIcon } from 'angular-svg-icon';

@NgModule({
  imports: [IconComponent, AngularSvgIconModule.forRoot()],
  exports: [IconComponent],
})
export class IconModule {
  /**
   * For standalone / `app.config.ts` contexts: registers the environment-level
   * providers. Then import `IconComponent` directly in each standalone component
   * that uses `<uilibrary-icon>`.
   *
   * ```ts
   * // app.config.ts
   * export const appConfig: ApplicationConfig = {
   *   providers: [IconModule.forStandalone()]
   * };
   *
   * // my.component.ts
   * @Component({ standalone: true, imports: [IconComponent] })
   * ```
   */
  static forStandalone(): EnvironmentProviders {
    return provideAngularSvgIcon();
  }
}
