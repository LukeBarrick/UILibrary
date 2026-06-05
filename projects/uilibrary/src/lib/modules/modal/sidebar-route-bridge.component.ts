import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Headless placeholder component for sidebar named-outlet routes.
 *
 * Use this as the `component` on any sidebar auxiliary route and declare the
 * actual drawer content type in `data.sidebarComponent`. This ensures that
 * the drawer component is only instantiated once — inside the CDK overlay by
 * `SidebarModalOutletComponent` — rather than also in the hidden router outlet.
 *
 * @example
 * // In your shell module route config:
 * {
 *   path: 'my-drawer',
 *   outlet: 'sidebar',
 *   component: SidebarRouteBridgeComponent,
 *   data: { sidebarComponent: MyDrawerContentComponent }
 * }
 */
@Component({
  selector: 'ui-sidebar-route-bridge',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SidebarRouteBridgeComponent {}
