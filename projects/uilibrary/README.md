# uilibrary

An Angular UI component library built with [ng-packagr](https://github.com/ng-packagr/ng-packagr). Provides **17 feature modules** of reusable, styled components — from buttons and inputs to a datepicker, context menus, keyboard navigation, and a programmatic modal system. Distributed as an npm package and consumed via `UserInterfaceLibraryModule`.

---

## Installation

```bash
npm install uilibrary
```

Then import the stylesheet in your `angular.json`:

```json
"styles": [
  "node_modules/uilibrary/assets/styles.css"
]
```

Import the root module (provides all modules at once) or cherry-pick individual feature modules:

```typescript
// Everything — easiest for getting started
import { UserInterfaceLibraryModule } from 'uilibrary';

// Cherry-pick — better for bundle size
import { ButtonModule } from 'uilibrary';
import { DatepickerModule } from 'uilibrary';
import { UiModalModule } from 'uilibrary';
```

---

## How the Library is Built and Distributed

The library uses **ng-packagr** (configured in `ng-package.json`) to compile Angular components into a format consumable by any Angular application. The build output goes to `dist/uilibrary` at the workspace root.

```json
// ng-package.json
{
  "dest": "../../dist/uilibrary",
  "lib": {
    "entryFile": "src/public-api.ts"
  },
  "assets": ["./assets/**/*.*"]
}
```

**`public-api.ts`** is the single entry point for the library. Only symbols exported from this file are visible to consumers — everything else is treated as an internal implementation detail. This is an Angular library convention enforced by ng-packagr.

In the workspace, the path alias `"uilibrary": ["./dist/uilibrary"]` in the root `tsconfig.json` allows the showcase app to import from `'uilibrary'` as if it were an npm package, using the local build output.

---

## Module Architecture

The library internals are split into four layers:

```
src/lib/
├── core/          ← Singleton services, models, enums, tokens — no UI
├── modules/       ← 17 feature modules, each containing one component family
├── shared/        ← Shared declarations reused across feature modules
└── playground/    ← Visual test components used during development (also exported)
```

### CoreModule
Provides the foundational services and domain types for the entire library. It uses Angular's `forRoot()` guard pattern to ensure it is only imported once.

| Item | Type | Description |
|---|---|---|
| `IconService` | Service | Registers and resolves SVG icons |
| `ToastService` | Service | Programmatic toast notification triggers |
| `DateFnsLocaleService` | Service | Locale-aware date formatting via date-fns |
| `UUIDService` | Service | Generates unique element IDs for accessibility |
| `DATE_NOW` | Injection Token | Testable abstraction over `new Date()` |
| `NavigationLinkType` | Enum | Internal vs external navigation link variants |
| `LabelPosition` | Enum | Above / inline label positioning |
| `Item` | Model | Generic label/value pair used by select, radio, etc. |
| `NavigationLink` | Model | Typed navigation link structure |
| `ToastOptions` | Model | Toast configuration options |
| `date-fns.map` | Bridge | Maps Angular locale IDs to date-fns locale objects |

### SharedModule
Shared Angular declarations (pipes, utility directives) that have no domain logic. Any feature module can import `SharedModule` without creating circular dependencies.

---

## Feature Modules

Import only the modules you need. Each module is self-contained and can be added to an `NgModule`'s `imports` array independently.

```typescript
import { ButtonModule } from 'uilibrary';
import { DatepickerModule } from 'uilibrary';
import { UiModalModule } from 'uilibrary';
```

### ButtonComponent inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `appearance` | `'primary'` \| `'secondary'` \| `'primary-success'` \| `'primary-delete'` \| `'secondary-success'` \| `'secondary-delete'` | `'primary'` | Visual variant |
| `size` | `'small'` \| `undefined` | `undefined` (regular) | Button size |
| `disabled` | `boolean` | `undefined` | Disables the button |
| `icon` | `string` | `undefined` | Registered icon name to render inside the button |
| `aria_label` | `string` | `undefined` | Accessible label when the button has no visible text |

```html
<uilibrary-button appearance="primary" size="small" icon="plus">Add item</uilibrary-button>
```

### DatepickerModule usage

The `DateSelectionStrategy` token controls how dates are selected. The default strategy (`DefaultDateSelectionStrategy`) is provided by `DatepickerModule`. Override it to implement custom range-selection logic:

```typescript
import { DatepickerModule, DateSelectionStrategy } from 'uilibrary';
import { MyRangeStrategy } from './my-range-strategy';

@NgModule({
  imports: [DatepickerModule],
  providers: [
    { provide: DateSelectionStrategy, useClass: MyRangeStrategy }
  ]
})
export class MyModule {}
```

For the modal API, see [src/lib/modules/modal/MODAL.md](src/lib/modules/modal/MODAL.md) and [src/lib/modules/modal/SIDEBAR.md](src/lib/modules/modal/SIDEBAR.md).

| Module | Key Exports | Notes |
|---|---|---|
| `ButtonModule` | `ButtonComponent` | Styled button with variant and size inputs |
| `CheckboxesModule` | `CheckboxComponent` | Accessible checkbox with label support |
| `ContextMenuModule` | `ContextMenuComponent`, `MenuTriggerDirective`, `ContextSideMenuComponent` | Overlay context menus triggered by a directive |
| `DatepickerModule` | `DatepickerInputComponent`, `CalendarComponent`, `DateRangeInputComponent`, start/end/date-input directives | Full date and date-range picker with custom selection strategy support |
| `FormFieldModule` | `FormFieldComponent`, `UIPrefix` directive, `UISuffix` directive | Wrapper providing consistent label, prefix, suffix, and annotation layout |
| `IconModule` | `IconComponent` | Renders registered SVGs; works with `IconService` |
| `InputModule` | `InputComponent` | Text input; designed to be used inside `FormFieldModule` |
| `InputAnnotationsModule` | `HintComponent`, `RequiredComponent`, `TooltipComponent` | Field-level annotations (hints, required marker, inline tooltip) |
| `KeyboardNavigationModule` | `CellNavDirective`, `NavRegistryService` | Arrow-key grid/list navigation for accessibility |
| `NavigationModule` | `NavigationComponent`, `NavigationDropdownComponent`, `NavigationOptionComponent` | Primary navigation bar with dropdown support |
| `RadioModule` | `RadioButtonComponent`, `RadioGroupComponent` | Accessible radio button group |
| `RtlLayoutModule` | `RtlLayoutDirective` | Applies RTL layout direction to a host element |
| `SelectModule` | `SelectComponent` | Wraps `ng-select` with library styling and WCAG helpers |
| `StatusTagsModule` | `StatusTagComponent` | Coloured status/badge tags |
| `TableModule` | `TableComponent`, `TableColumnComponent`, `HeaderDirective`, `CellDirective` | Data table with column configuration via directives |
| `ToggleModule` | `ToggleComponent` | Accessible on/off toggle switch |
| `ModalModule` | `UiModalService`, `UiModalRef`, `ActiveModal`, `UiModalConfig`, `UiModalOptions`, `UiModalDismissReasons` | Programmatic modal service built on Angular CDK Overlay; mirrors the ng-bootstrap modal API without requiring ng-bootstrap |
| `SidebarModalModule` | `SidebarModalService`, `SidebarModalOutletComponent` | Router-driven drawer (side panel) system; URL-addressable and deep-linkable via Angular named outlets |

---

## Playground Module

`PlaygroundModule` contains a set of host components — one per feature module — that render examples of each component in isolation. These are used during library development to visually verify components without running the full showcase app.

The playground components are also exported from `public-api.ts` and used by the showcase's playground route.

---

## SCSS Design System

The library's styles live in `styles/` and are compiled separately from the Angular component build using the Sass CLI. The compiled output is `assets/styles.css`, which consumers import into their application alongside the Angular modules.

```
styles/
├── styles.scss           ← Master entry point; imports everything below
├── variable.scss         ← Design tokens: colour palette (primary/secondary/tertiary + variants,
│                            success/info/warning/danger), spacing, etc.
├── variable-override.scss← Bootstrap variable overrides + custom font-face declarations
│                            (Borna Semibold, Medium, Regular from assets/fonts/)
├── animations.scss       ← Keyframe animations (e.g. growDown for dropdown reveal)
├── components/
│   ├── _index.scss       ← Imports all component partials
│   ├── checkboxes/
│   ├── input-annotations/
│   ├── navigation/
│   ├── status-tags/
│   ├── toggles/
│   └── newcomponents/
└── utilities/
    ├── _index.scss
    ├── _typography.scss
    ├── _utils.scss        ← Order utility classes
    ├── _logical-properties.scss
    ├── _scrollbar.scss
    └── _toast.scss
```

### Consuming Library Styles

Consumers must import the compiled stylesheet in their `angular.json`:

```json
"styles": [
  "node_modules/uilibrary/assets/styles.css"
]
```

---

## Building

### Development (watch mode)
Run both commands concurrently during local development:

```bash
# Compile the Angular library (watches for changes)
npm run build-lib:dev

# Compile SCSS (watches for changes)
npm run build-sass:dev
```

### Production
```bash
npm run build-sass    # Compile SCSS once
npm run build-lib     # Build library in production mode (optimised, with type declarations)
```

The production build enables tree-shaking and generates `.d.ts` declaration files so consumers get full TypeScript type support.

---

## Testing

Tests are run with **Karma** and **Jasmine**. [ng-mocks](https://ng-mocks.sudo.eu/) is used to simplify Angular test setup by automatically mocking component dependencies.

```bash
npm test
# or
ng test uilibrary
```

### Test Setup (`src/test.ts`)

A custom test entry point configures the test environment before any spec files run:

```typescript
// Replaces all mocked methods with Jasmine spies automatically
ngMocks.autoSpy('jasmine');

// Bootstraps the Angular TestBed once for all tests
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
  { teardown: { destroyAfterEach: true } },
);
```

`teardown: { destroyAfterEach: true }` is the Angular 14+ recommended default — it destroys the TestBed fixture after each test to prevent state leaking between specs.

### Writing Tests with ng-mocks

```typescript
import { MockBuilder, MockRender } from 'ng-mocks';

describe('ButtonComponent', () => {
  beforeEach(() => MockBuilder(ButtonComponent, ButtonModule));

  it('should create', () => {
    const fixture = MockRender(ButtonComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
```

`MockBuilder(component, module)` replaces all other declarations in the module with mocks. `MockRender` creates a wrapper host component, giving access to both the component instance and the rendered DOM.

---

## Peer Dependencies

Consumers of the library must have the following installed:

| Package | Version |
|---|---|
| `@angular/common` | ^21.1.0 |
| `@angular/core` | ^21.1.0 |
| `@angular/animations` | ^21.1.0 |
| `@ng-select/ng-select` | ^21.5.2 |
| `angular-svg-icon` | ^17.0.0 |
| `date-fns` | ^4.1.0 |
| `ngx-toastr` | ^19.0.0 |

---

## Adding a New Feature Module

Follow this checklist when adding a new component family:

```
1. Create folder:      projects/uilibrary/src/lib/modules/<name>/
2. Create NgModule:    <Name>Module — declarations + exports for all public components
3. Create component:   <name>.component.ts / .html / .css
4. Export via API:     add `export * from './lib/modules/<name>/...'` to public-api.ts
5. Add SCSS:           projects/uilibrary/styles/components/<name>/ and import in _index.scss
6. Add showcase page:  projects/showcase/src/app/docs/<name>-showcase/
7. Register route:     lazy-loaded route in showcase docs routing
```

For one-off component generation (skips module setup):

```bash
ng generate component modules/<name>/<name> --project uilibrary --no-standalone
```

Always export new public symbols from `public-api.ts` — ng-packagr will not expose anything that is not re-exported there.

