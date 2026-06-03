import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Sidebar-aware navigation service.
 *
 * All sidebar-drawer navigation goes through this service.
 * Feature components never call router.navigate() with outlet syntax directly.
 *
 * Visual lifecycle (open/close animation) is managed by SidebarModalOutletComponent,
 * which bridges Angular's named router outlet state to UiModalService's CDK overlay.
 *
 * @example
 * constructor(private sidebarModal: SidebarModalService) {}
 *
 * openProfile(): void { this.sidebarModal.open('sidebar-profile'); }
 * close(): void        { this.sidebarModal.close(); }
 */
@Injectable()
export class SidebarModalService {
  /** Cached from the last open() call so close() navigates at the same level. */
  private _relativeTo: ActivatedRoute | null = null;

  constructor(private readonly _router: Router) {}

  /**
   * Registers the route context used for outlet navigation.
   * Called automatically by SidebarModalOutletComponent on init so that close()
   * works correctly even when the sidebar was opened via a direct URL (deep-link)
   * rather than through open().
   */
  registerRoute(route: ActivatedRoute): void {
    this._relativeTo = route;
  }

  /**
   * Activates the named 'sidebar' outlet at the given path(s).
   * SidebarModalOutletComponent detects the resulting NavigationEnd event
   * and opens the CDK overlay drawer automatically.
   *
   * @param path A single route segment string, or an array of segments.
   * @param relativeTo The route whose level contains the named 'sidebar' outlet.
   *   Pass the ActivatedRoute of the component that owns the outlet's parent
   *   (e.g. `this.route.parent` from a child of PlaygroundLayoutComponent).
   *   Without this the router resolves the outlet at root level and throws NG04002.
   */
  open(path: string | string[], relativeTo?: ActivatedRoute): void {
    const segments = Array.isArray(path) ? path : [path];
    if (relativeTo) {
      this._relativeTo = relativeTo;
    }
    this._router.navigate(
      [{ outlets: { sidebar: segments } }],
      this._relativeTo ? { relativeTo: this._relativeTo } : {},
    );
  }

  /**
   * Deactivates the 'sidebar' named outlet.
   * SidebarModalOutletComponent will dismiss the open drawer when it detects
   * the resulting NavigationEnd event.
   * Uses the same relative route context as the last open() call.
   */
  close(): void {
    this._router.navigate(
      [{ outlets: { sidebar: null } }],
      this._relativeTo ? { relativeTo: this._relativeTo } : {},
    );
  }
}
