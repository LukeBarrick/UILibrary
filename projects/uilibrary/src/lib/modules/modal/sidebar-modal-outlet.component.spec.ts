import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MockBuilder, MockRender } from 'ng-mocks';
import { Subject } from 'rxjs';

import { UiModalRef } from './modal-ref';
import { UiModalService } from './modal.service';
import { SidebarModalModule } from './sidebar-modal.module';
import { SidebarModalOutletComponent } from './sidebar-modal-outlet.component';
import { SidebarRouteBridgeComponent } from './sidebar-route-bridge.component';

// ---------------------------------------------------------------------------
// Minimal stub components used as drawer content in route data / snapshots
// ---------------------------------------------------------------------------
@Component({ selector: 'ui-fake-drawer-a', template: '', standalone: false })
class FakeDrawerAComponent {}

@Component({ selector: 'ui-fake-drawer-b', template: '', standalone: false })
class FakeDrawerBComponent {}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal ActivatedRouteSnapshot for the 'sidebar' outlet. */
function makeSnap(
  comp: any,
  data: Record<string, unknown> = {},
  firstChildSnap?: ActivatedRouteSnapshot,
): ActivatedRouteSnapshot {
  return {
    outlet: 'sidebar',
    component: comp,
    data,
    firstChild: firstChildSnap ?? null,
    children: firstChildSnap ? [firstChildSnap] : [],
    routeConfig: { path: 'test-sidebar' },
  } as unknown as ActivatedRouteSnapshot;
}

/** Call the private _openSidebar method via an escape-hatch cast. */
function callOpenSidebar(
  instance: SidebarModalOutletComponent,
  snap: ActivatedRouteSnapshot,
): void {
  (instance as any)._openSidebar(snap);
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('SidebarModalOutletComponent — _openSidebar content resolution', () => {
  let modalServiceSpy: jasmine.SpyObj<UiModalService>;
  let routerEvents$: Subject<unknown>;

  beforeEach(() => {
    const fakeRef: Partial<UiModalRef> = {
      hidden: { subscribe: jasmine.createSpy('subscribe') } as any,
      dismiss: jasmine.createSpy('dismiss'),
    };

    modalServiceSpy = jasmine.createSpyObj<UiModalService>('UiModalService', ['open']);
    modalServiceSpy.open.and.returnValue(fakeRef as UiModalRef);

    routerEvents$ = new Subject();

    const emptyRootSnap = {
      outlet: 'primary',
      component: null,
      data: {},
      firstChild: null,
      children: [],
    } as unknown as ActivatedRouteSnapshot;

    return MockBuilder(SidebarModalOutletComponent, SidebarModalModule)
      .provide({ provide: UiModalService, useValue: modalServiceSpy })
      .provide({
        provide: Router,
        useValue: {
          events: routerEvents$.asObservable(),
          routerState: { snapshot: { root: emptyRootSnap } },
          navigate: jasmine.createSpy('navigate'),
        },
      })
      .provide({ provide: ActivatedRoute, useValue: {} });
  });

  function getInstance(): SidebarModalOutletComponent {
    return MockRender(SidebarModalOutletComponent).point.componentInstance;
  }

  // ── Route-data path (preferred) ──────────────────────────────────────────

  it('should open the overlay with data.sidebarComponent when declared on the snapshot', () => {
    const snap = makeSnap(SidebarRouteBridgeComponent, {
      sidebarComponent: FakeDrawerAComponent,
    });

    callOpenSidebar(getInstance(), snap);

    expect(modalServiceSpy.open).toHaveBeenCalledOnceWith(
      FakeDrawerAComponent,
      jasmine.anything(),
    );
  });

  it('should NOT open the overlay with SidebarRouteBridgeComponent itself', () => {
    const snap = makeSnap(SidebarRouteBridgeComponent, {
      sidebarComponent: FakeDrawerAComponent,
    });

    callOpenSidebar(getInstance(), snap);

    const calledComp = modalServiceSpy.open.calls.mostRecent().args[0];
    expect(calledComp).not.toBe(SidebarRouteBridgeComponent);
  });

  it('should resolve data.sidebarComponent from a lazy firstChild snapshot', () => {
    const childSnap = makeSnap(SidebarRouteBridgeComponent, {
      sidebarComponent: FakeDrawerBComponent,
    });
    const parentSnap = makeSnap(SidebarRouteBridgeComponent, {}, childSnap);

    callOpenSidebar(getInstance(), parentSnap);

    expect(modalServiceSpy.open).toHaveBeenCalledOnceWith(
      FakeDrawerBComponent,
      jasmine.anything(),
    );
  });

  it('should prefer snap.data over firstChild.data when both are present', () => {
    const childSnap = makeSnap(SidebarRouteBridgeComponent, {
      sidebarComponent: FakeDrawerBComponent,
    });
    const parentSnap = makeSnap(SidebarRouteBridgeComponent, {
      sidebarComponent: FakeDrawerAComponent,
    }, childSnap);

    callOpenSidebar(getInstance(), parentSnap);

    expect(modalServiceSpy.open).toHaveBeenCalledOnceWith(
      FakeDrawerAComponent,
      jasmine.anything(),
    );
  });

  // ── Legacy fallback path ─────────────────────────────────────────────────

  it('should fall back to snapshot.component when data.sidebarComponent is absent', () => {
    const snap = makeSnap(FakeDrawerAComponent, {});

    callOpenSidebar(getInstance(), snap);

    expect(modalServiceSpy.open).toHaveBeenCalledOnceWith(
      FakeDrawerAComponent,
      jasmine.anything(),
    );
  });

  it('should emit console.warn on the legacy fallback path in dev mode', () => {
    const warnSpy = spyOn(console, 'warn');
    const snap = makeSnap(FakeDrawerAComponent, {});

    callOpenSidebar(getInstance(), snap);

    expect(warnSpy).toHaveBeenCalledWith(
      jasmine.stringContaining('[SidebarModalOutlet]'),
    );
  });

  it('should not emit console.warn when data.sidebarComponent is declared', () => {
    const warnSpy = spyOn(console, 'warn');
    const snap = makeSnap(SidebarRouteBridgeComponent, {
      sidebarComponent: FakeDrawerAComponent,
    });

    callOpenSidebar(getInstance(), snap);

    expect(warnSpy).not.toHaveBeenCalled();
  });

  // ── Create / compile ─────────────────────────────────────────────────────

  it('should create', () => {
    expect(getInstance()).toBeTruthy();
  });
});
