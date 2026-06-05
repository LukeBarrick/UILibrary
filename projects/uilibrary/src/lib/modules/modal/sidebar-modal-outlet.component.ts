import {
  ChangeDetectionStrategy,
  Component,
  isDevMode,
  OnDestroy,
  OnInit,
  Type,
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UiModalOptions } from './modal-options';
import { UiModalRef } from './modal-ref';
import { UiModalService } from './modal.service';
import { SidebarModalService } from './sidebar-modal.service';

/**
 * Headless component that bridges Angular's named router outlet state to
 * UiModalService's CDK overlay drawer.
 *
 * Place <ui-sidebar-modal-outlet> alongside a hidden <router-outlet name="sidebar">
 * in your shell template. This component watches NavigationEnd events and:
 *
 * - Opens a drawer modal when the 'sidebar' outlet becomes active.
 * - Dismisses the drawer when the outlet is cleared from the URL.
 * - Clears the outlet URL when the drawer is closed by the user (backdrop /
 *   Escape key), keeping router and visual state bidirectionally in sync.
 *
 * @example
 * // In your shell template (e.g. playground-layout.component.html):
 * <router-outlet></router-outlet>
 * <router-outlet name="sidebar" style="display: none"></router-outlet>
 * <ui-sidebar-modal-outlet></ui-sidebar-modal-outlet>
 *
 * // Sidebar routes — declared at the same level as primary child routes:
 * { path: 'sidebar-profile', outlet: 'sidebar', component: SidebarDemoProfileComponent }
 */
@Component({
  selector: 'ui-sidebar-modal-outlet',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SidebarModalOutletComponent implements OnInit, OnDestroy {
  private _ref: UiModalRef | null = null;
  private readonly _destroy$ = new Subject<void>();

  /** Default options applied to every drawer opened by this outlet. */
  private readonly _sidebarOptions: UiModalOptions = {
    windowClass: 'ui-sidebar',
    backdrop: true,
    keyboard: true,
    animation: true,
  };

  constructor(
    private readonly _router: Router,
    private readonly _modalService: UiModalService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _sidebarModalService: SidebarModalService,
  ) {}

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(this._destroy$),
      )
      .subscribe(() => this._syncWithRouter());

    // Register this component's ActivatedRoute with the service so that
    // close() always has the correct route context — even when the sidebar
    // was opened via a direct URL (deep-link) rather than through open().
    this._sidebarModalService.registerRoute(this._activatedRoute);

    // Handle deep-linking: if navigation already completed before this component
    // was initialized (e.g. the user pastes a URL with a sidebar outlet directly),
    // the NavigationEnd has already fired and we must sync against the current state.
    this._syncWithRouter();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    if (this._ref) {
      this._ref.dismiss('outlet-destroyed');
      this._ref = null;
    }
  }

  // ── Private ────────────────────────────────────────────────────────────────

  /**
   * Walks the current router state snapshot to find the active 'sidebar'
   * outlet route. Opens or closes the drawer accordingly.
   */
  private _syncWithRouter(): void {
    const sidebarSnap = this._findSidebarSnapshot(this._router.routerState.snapshot.root);

    if (sidebarSnap && !this._ref) {
      this._openSidebar(sidebarSnap);
    } else if (!sidebarSnap && this._ref) {
      // Navigation cleared the outlet — dismiss the overlay
      this._ref.dismiss('navigation');
      this._ref = null;
    }
  }

  /**
   * Recursively walks the route snapshot tree to find the first snapshot
   * whose outlet name is 'sidebar'.
   */
  private _findSidebarSnapshot(snap: ActivatedRouteSnapshot): ActivatedRouteSnapshot | null {
    if (snap.outlet === 'sidebar') {
      return snap;
    }
    for (const child of snap.children) {
      const found = this._findSidebarSnapshot(child);
      if (found) return found;
    }
    return null;
  }

  /**
   * Resolves the routable component from the snapshot (supports lazy-loaded
   * forChild modules where path: '' holds the real component), then opens it
   * in a CDK overlay styled as a right-side drawer.
   */
  private  _openSidebar(snap: ActivatedRouteSnapshot): void {
    // Prefer the explicit content type declared in route data so that the real
    // drawer component is instantiated only once — inside the CDK overlay.
    // Consumers should declare sidebar routes as:
    //   { path: '...', outlet: 'sidebar',
    //     component: SidebarRouteBridgeComponent,
    //     data: { sidebarComponent: MyDrawerComponent } }
    //
    // The legacy fallback (snapshot.component) still works but instantiates
    // the component twice — once in the hidden outlet, once in the overlay.
    const fromData: Type<any> | null =
      snap.data['sidebarComponent'] ??
      snap.firstChild?.data?.['sidebarComponent'] ??
      null;

    if (!fromData && isDevMode()) {
      console.warn(
        `[SidebarModalOutlet] Sidebar route '${
          snap.routeConfig?.path ?? '(unknown)'
        }' does not declare data.sidebarComponent. ` +
          'The drawer content component will be instantiated twice (once in the hidden ' +
          'outlet, once in the CDK overlay). Migrate to: ' +
          '{ component: SidebarRouteBridgeComponent, data: { sidebarComponent: MyDrawerComponent } }.',
      );
    }

    const comp = (fromData ?? snap.firstChild?.component ?? snap.component) as Type<any> | null;
    if (!comp) {
      return;
    }

    this._ref = this._modalService.open(comp, this._sidebarOptions);

    // When the drawer is dismissed by the user (backdrop / Escape / close
    // button via SidebarModalService.close() → navigation), sync back the URL.
    this._ref.hidden.subscribe(() => {
      this._ref = null;
      this._clearSidebarRoute();
    });
  }

  /**
   * Navigates to clear the 'sidebar' outlet, but only if it is still active
   * in the current router snapshot. Prevents an infinite navigation loop when
   * the outlet was already cleared by a prior navigation event.
   */
  private _clearSidebarRoute(): void {
    const stillActive = this._findSidebarSnapshot(this._router.routerState.snapshot.root);
    if (stillActive) {
      // relativeTo: _activatedRoute resolves to PlaygroundLayoutComponent's route
      // (the component that owns this outlet in its template), ensuring the
      // null-outlet navigation targets the correct level of the URL tree.
      this._router.navigate([{ outlets: { sidebar: null } }], { relativeTo: this._activatedRoute });
    }
  }
}
