# UiModal

A programmatic modal service for the UI Library. Mirrors the Ng-Bootstrap modal API without introducing Ng-Bootstrap as a dependency. Built on Angular CDK Overlay and CDK A11y — no third-party UI framework required.

---

## Contents

- [Setup](#setup)
- [Basic usage — component content](#basic-usage--component-content)
- [Basic usage — template content](#basic-usage--template-content)
- [Reacting to close and dismiss](#reacting-to-close-and-dismiss)
- [Controlling a modal from inside the content](#controlling-a-modal-from-inside-the-content)
- [Passing data into the modal](#passing-data-into-the-modal)
- [Options reference](#options-reference)
- [Global defaults with UiModalConfig](#global-defaults-with-uimodalconfig)
- [Stacked modals](#stacked-modals)
- [Dynamic option updates](#dynamic-option-updates)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)

---

## Setup

`UiModalModule` is already imported by `UserInterfaceLibraryModule`, so no additional module import is needed if you are using the full library.

To use the modal service, inject `UiModalService` into your component or service:

```typescript
import { UiModalService } from 'uilibrary';

@Component({ ... })
export class MyComponent {
  constructor(private modalService: UiModalService) {}
}
```

---

## Basic usage — component content

Pass any Angular component class as the first argument to `open()`. The component is instantiated dynamically inside the modal shell.

```typescript
import { UiModalService } from 'uilibrary';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({ ... })
export class MyComponent {
  constructor(private modalService: UiModalService) {}

  openConfirm(): void {
    const ref = this.modalService.open(ConfirmDialogComponent, {
      size: 'sm',
      centered: true,
    });

    ref.closed.subscribe(result => {
      console.log('User confirmed:', result);
    });
  }
}
```

The opened component receives no special inputs by default. Use [`UiActiveModal`](#controlling-a-modal-from-inside-the-content) to close it from within, or set properties directly on `ref.componentInstance` after calling `open()`.

---

## Basic usage — template content

Pass a `TemplateRef` to render inline template markup inside the modal. Capture the template with `@ViewChild` or a local template variable.

```html
<!-- my.component.html -->
<ng-template #confirmTpl>
  <div class="ui-modal-header">
    <h5 class="ui-modal-title">Are you sure?</h5>
  </div>
  <div class="ui-modal-body">
    <p>This action cannot be undone.</p>
  </div>
  <div class="ui-modal-footer">
    <button (click)="modal.dismiss()">Cancel</button>
    <button (click)="modal.close(true)">Confirm</button>
  </div>
</ng-template>
```

```typescript
@ViewChild('confirmTpl') confirmTpl!: TemplateRef<any>;

open(): void {
  this.modalService.open(this.confirmTpl, { centered: true });
}
```

> **Note:** Template modals cannot inject `UiActiveModal`. To close or dismiss from within the template, hold a reference to the `UiModalRef` returned by `open()` and call `.close()` / `.dismiss()` on it directly, or expose a property on the host component.

You can pass data to the template via `templateContext`:

```typescript
this.modalService.open(this.confirmTpl, {
  templateContext: { itemName: 'Invoice #42' },
});
```

```html
<ng-template #confirmTpl let-itemName="itemName">
  <div class="ui-modal-body">Delete {{ itemName }}?</div>
</ng-template>
```

---

## Reacting to close and dismiss

`open()` returns a `UiModalRef` with two distinct event channels:

| Channel | Trigger | Value |
|---|---|---|
| `ref.closed` | `.close(result)` called | The `result` argument |
| `ref.dismissed` | `.dismiss(reason)` called, backdrop click, ESC key | The `reason` argument or a `UiModalDismissReason` constant |
| `ref.result` | Either | Resolves on close, rejects on dismiss |

**Observable approach (recommended):**

```typescript
const ref = this.modalService.open(MyComponent);

ref.closed.subscribe(result => {
  this.saveData(result);
});

ref.dismissed.subscribe(reason => {
  if (reason !== UiModalDismissReason.BackdropClick) {
    console.log('Dismissed with:', reason);
  }
});
```

**Promise approach:**

```typescript
const ref = this.modalService.open(MyComponent);

ref.result
  .then(result => this.saveData(result))
  .catch(reason => console.log('Dismissed:', reason));
```

**Lifecycle observables:**

```typescript
ref.shown.subscribe(() => {
  // Open animation has completed — modal is fully visible
  this.inputEl.nativeElement.focus();
});

ref.hidden.subscribe(() => {
  // Close animation has completed — modal is fully removed from DOM
});
```

---

## Controlling a modal from inside the content

Inject `UiActiveModal` into any component used as modal content. This gives the component the ability to close or dismiss the modal without holding a reference to the `UiModalRef`.

```typescript
import { UiActiveModal } from 'uilibrary';

@Component({
  template: `
    <div class="ui-modal-header">
      <h5 class="ui-modal-title">Edit record</h5>
    </div>
    <div class="ui-modal-body">
      <input [(ngModel)]="value" />
    </div>
    <div class="ui-modal-footer">
      <button (click)="activeModal.dismiss('cancel')">Cancel</button>
      <button (click)="activeModal.close(value)">Save</button>
    </div>
  `,
})
export class EditRecordComponent {
  value = '';

  constructor(public activeModal: UiActiveModal) {}
}
```

`UiActiveModal` is provided via a child injector scoped to the modal instance, so each modal gets its own independent instance automatically.

---

## Passing data into the modal

Since `open()` returns a `UiModalRef` before the `ngAfterViewInit` lifecycle hook of the content component fires, you can set properties on `ref.componentInstance` immediately after the call:

```typescript
const ref = this.modalService.open(EditRecordComponent);
ref.componentInstance.value = this.selectedRecord.name;
ref.componentInstance.recordId = this.selectedRecord.id;
```

> `componentInstance` is `undefined` when a `TemplateRef` is used as content.

---

## Options reference

All options are optional. Defaults can be overridden globally via [`UiModalConfig`](#global-defaults-with-uimodalconfig).

| Option | Type | Default | Description |
|---|---|---|---|
| `animation` | `boolean` | `true` | Animate open and close with CSS transitions. |
| `backdrop` | `boolean \| 'static'` | `true` | Show a backdrop. `'static'` keeps the modal open on backdrop click (plays a bounce animation instead). |
| `backdropClass` | `string` | — | Extra CSS class(es) appended to the backdrop element. |
| `centered` | `boolean` | `false` | Vertically center the dialog in the viewport. |
| `keyboard` | `boolean` | `true` | Close the modal when the Escape key is pressed. |
| `size` | `'sm' \| 'lg' \| 'xl' \| string` | — | Sets the max-width of the dialog. Custom strings append a `ui-modal-dialog--{size}` CSS class. |
| `scrollable` | `boolean` | `false` | Make the modal body independently scrollable while the header and footer stay fixed. |
| `fullscreen` | `boolean \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | `false` | `true` = always fullscreen. A breakpoint string = fullscreen only below that breakpoint. |
| `windowClass` | `string` | — | Extra CSS class(es) appended to the `.ui-modal-dialog` element. |
| `modalDialogClass` | `string` | — | Alias for `windowClass` — also appended to `.ui-modal-dialog`. |
| `ariaLabelledBy` | `string` | — | `aria-labelledby` attribute on the modal window — should point to the modal title element's id. |
| `ariaDescribedBy` | `string` | — | `aria-describedby` attribute on the modal window. |
| `role` | `'dialog' \| 'alertdialog'` | `'dialog'` | ARIA role of the modal window. Use `'alertdialog'` for destructive confirmation dialogs. |
| `injector` | `Injector` | — | Custom injector used as the parent when creating the content component's injector. Useful for providing additional tokens to modal content. |
| `templateContext` | `any` | — | Context object passed to `TemplateRef` content via `createEmbeddedView`. |

---

## Global defaults with UiModalConfig

`UiModalConfig` is a plain injectable service. Inject it and mutate its properties to set defaults that apply to every modal opened in the application.

```typescript
import { UiModalConfig } from 'uilibrary';

@Component({ ... })
export class AppComponent {
  constructor(config: UiModalConfig) {
    config.centered = true;
    config.animation = false;
  }
}
```

Per-call options passed to `open()` always take precedence over the global config.

---

## Stacked modals

Opening a modal from within another modal is supported. Each call to `open()` creates an independent CDK Overlay panel. CDK automatically assigns incrementing z-index values so the newest modal always renders on top.

Escape key handling respects the stack — only the topmost modal is dismissed per keypress. Calling `dismissAll()` closes all open modals in reverse order.

```typescript
// Inside a modal content component
openNested(): void {
  this.modalService.open(NestedModalComponent, { size: 'sm' });
}
```

```typescript
// Close all modals at once
this.modalService.dismissAll('session-expired');
```

---

## Dynamic option updates

Options can be changed on an already-open modal via `UiModalRef.update()` or `UiActiveModal.update()`.

```typescript
// From outside the modal
const ref = this.modalService.open(MyComponent);
ref.update({ size: 'xl', centered: true });

// From inside the modal content component
this.activeModal.update({ backdrop: 'static' });
```

---

## API reference

### `UiModalService`

| Member | Signature | Description |
|---|---|---|
| `open()` | `(content: Type<any> \| TemplateRef<any>, options?: UiModalOptions) => UiModalRef` | Opens a modal. Returns a `UiModalRef`. |
| `dismissAll()` | `(reason?: any) => void` | Dismisses every open modal in reverse order. |
| `hasOpenModals()` | `() => boolean` | Returns `true` if any modal is currently open. |
| `activeInstances` | `EventEmitter<UiModalRef[]>` | Emits the current open-modal stack whenever it changes. |

---

### `UiModalRef`

| Member | Type | Description |
|---|---|---|
| `componentInstance` | `any` | The instance of the content component. `undefined` for template content. |
| `result` | `Promise<any>` | Resolves on `.close()`, rejects on `.dismiss()`. |
| `closed` | `Observable<any>` | Emits the close result. |
| `dismissed` | `Observable<any>` | Emits the dismiss reason. |
| `shown` | `Observable<void>` | Emits once after the open animation completes. |
| `hidden` | `Observable<void>` | Emits once after the close animation completes and the DOM is clean. |
| `close(result?)` | `void` | Triggers close animation, then resolves `result`. |
| `dismiss(reason?)` | `void` | Triggers close animation, then rejects with `reason`. |
| `update(options)` | `void` | Applies partial option changes to the live modal. |

---

### `UiActiveModal`

Injectable into component content. Delegates to the modal's `UiModalRef`.

| Method | Description |
|---|---|
| `close(result?)` | Same as `UiModalRef.close()`. |
| `dismiss(reason?)` | Same as `UiModalRef.dismiss()`. |
| `update(options)` | Same as `UiModalRef.update()`. |

---

### `UiModalDismissReason`

```typescript
enum UiModalDismissReason {
  BackdropClick = 'backdrop-click',
  Esc           = 'esc',
}
```

Use these constants when checking the `dismissed` observable/promise rejection reason.

---

### SCSS utility classes

Apply these classes to your modal content component's template for consistent layout:

| Class | Element | Purpose |
|---|---|---|
| `.ui-modal-header` | `div` | Top bar — flex row, bottom border |
| `.ui-modal-title` | `h5` inside header | Title text |
| `.ui-modal-body` | `div` | Main content area with padding |
| `.ui-modal-footer` | `div` | Bottom bar — flex row, right-aligned, top border |

---

## Technical decisions

### Why Angular CDK instead of building from scratch?

Angular CDK's `Overlay` module solves a class of hard problems that a custom implementation would need to re-solve:

- **Z-index stacking** — each overlay gets a monotonically increasing z-index, so stacked modals always render in the correct order without any manual tracking.
- **Overlay container** — CDK manages a single `<div class="cdk-overlay-container">` appended to `<body>`, ensuring all overlays live outside the normal component tree and are not clipped by parent `overflow: hidden` rules.
- **SSR compatibility** — CDK's overlay container is platform-aware.

CDK `A11yModule` provides `CdkTrapFocus` / `cdkTrapFocusAutoCapture`, which automatically traps keyboard focus inside the dialog — a WCAG requirement. Building a robust focus trap (handling dynamically added focusable elements, shadow DOM, etc.) from scratch is non-trivial.

### Why no body-scroll lock?

Locking body scroll (`overflow: hidden` on `<body>`) is the conventional approach but has unresolved issues in some browsers and contexts (e.g. iOS Safari momentum scrolling, scrollbar reflow causing layout shift). The decision was made to not lock, keeping the modal's scroll strategy as CDK's `noop()`. The `.ui-modal` element itself uses `overflow-y: auto` so the modal content always scrolls independently of the page.

### Why CSS transitions instead of Angular Animations?

The `@angular/animations` API requires `BrowserAnimationsModule` at the application root and couples animation definitions to TypeScript. CSS transitions keep animation logic in SCSS, closer to where other visual decisions live, and avoid the overhead of the animation engine for what amounts to simple opacity and translate tweens. The tradeoff is that `shown` and `hidden` lifecycle observables depend on `transitionend` DOM events — if a consumer sets `animation: false` the service short-circuits this path synchronously.

### Why are `close` and `dismiss` distinct?

Following Ng-Bootstrap's convention: `close()` signals a positive outcome (the user completed the action) and resolves `result`; `dismiss()` signals cancellation or an unexpected exit and rejects `result`. This distinction lets callers use a single `result` Promise with conventional `.then()` / `.catch()` semantics, as well as two separate Observables (`closed`, `dismissed`) for consumers who prefer not to use try/catch with Promises.

### Why does `UiActiveModal` use a class and not `InjectionToken`?

`InjectionToken` would require consumers to import the token and use `@Inject()`. Using a class as both the injection token and the implementation allows the simpler `constructor(private activeModal: UiActiveModal)` syntax. The service is not `providedIn: 'root'` — it is created fresh per modal via a child `Injector`, so each modal content component gets an instance bound to its own `UiModalRef`.

### Why is `UiModalConfig` `providedIn: 'root'` rather than in `CoreModule`?

`UiModalConfig` is a plain class with no dependencies. `providedIn: 'root'` makes it tree-shakable and ensures a single instance exists for the lifetime of the application without requiring an explicit `forRoot()` call. It is also registered in `CoreModule.providers` as an explicit provider to make the singleton contract clear to library consumers who inspect the module.

### Stacked-modal Escape handling

A single `fromEvent(document, 'keydown')` subscription is created once in `UiModalService` and never duplicated. On each Escape keypress it reads the last item in `_openModals` (the stack top) and dismisses only that modal. This is simpler and more reliable than having each `UiModalComponent` instance compete to handle the same event, which would require coordination logic to determine which instance is "on top".
