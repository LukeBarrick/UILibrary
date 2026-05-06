# showcase

The developer reference Angular application for the `uilibrary` component library. Not published — runs locally to browse component documentation, test interactive examples, and verify library output before release. Built with Angular 21 using traditional NgModule-based architecture with lazy-loaded feature routes.

---

## Running the App

Ensure the library has been built first (the showcase imports from `dist/uilibrary`):

```bash
# In separate terminals:
npm run build-lib:dev   # Builds uilibrary and watches for changes
npm run build-sass:dev  # Compiles SCSS and watches for changes

# Then start the app:
npm start
# → http://localhost:4200
```

> The VS Code **Start All** task runs all three commands automatically.

---

## Routing Architecture

The app uses a **layout wrapper pattern**: a single `LayoutComponent` is the parent route, and all main sections are child routes rendered inside it. This gives every page a consistent shell (navigation bar, footer, etc.) without repeating the layout in each feature module.

```typescript
// app-routing.module.ts
{
  path: '',
  component: LayoutComponent,     // Shell rendered immediately
  children: [
    { path: 'home',       loadChildren: () => import('./home/home.module') },
    { path: 'docs',       loadChildren: () => import('./docs/docs.module') },
    { path: 'guides',     loadChildren: () => import('./guides/guides.module') },
    { path: 'blog',       loadChildren: () => import('./blog/blog.module') },
    { path: 'playground', loadChildren: () => import('./playground/playground.module') },
  ]
}
```

All child routes are **lazy-loaded** — each feature module's JavaScript bundle is downloaded only when the route is first visited. This keeps the initial load fast regardless of how many showcase pages exist.

There is also a separate top-level route:

```typescript
{ path: 'showcase', component: ShowcaseComponent }
```

This renders the `ShowcaseComponent` imported directly from the library package, outside the layout shell, as a full-page standalone view.

---

## Feature Sections

### `/home`
The app landing page. Introduces the library and links to the main sections.

**Module:** `HomeModule` (`app/home/`)

---

### `/docs`
Component documentation pages — one page per uilibrary feature module. Each page demonstrates the component's variants, inputs, outputs, and usage patterns with live rendered examples.

**Module:** `DocumentationModule` (`app/docs/`)

| Route | Showcase Component | uilibrary Module |
|---|---|---|
| `/docs/button` | `ButtonShowcaseComponent` | `ButtonModule` |
| `/docs/checkbox` | `CheckboxShowcaseComponent` | `CheckboxesModule` |
| `/docs/datepicker` | `DatepickerShowcaseComponent` | `DatepickerModule` |
| `/docs/icon` | `IconShowcaseComponent` | `IconModule` |
| `/docs/input` | `InputShowcaseComponent` | `InputModule` |
| `/docs/navigation` | `NavigationShowcaseComponent` | `NavigationModule` |
| `/docs/radio` | `RadioShowcaseComponent` | `RadioModule` |
| `/docs/select` | `SelectShowcaseComponent` | `SelectModule` |
| `/docs/status-tags` | `StatusTagShowcaseComponent` | `StatusTagsModule` |
| `/docs/toast` | `ToastShowcaseComponent` | Toast via `ToastService` |
| `/docs/toggle` | `ToggleShowcaseComponent` | `ToggleModule` |
| `/docs/tooltip` | `TooltipShowcaseComponent` | `InputAnnotationsModule` |

---

### `/guides`
Written guides covering integration, configuration, and advanced usage topics.

**Module:** `GuidesModule` (`app/guides/`)

Subfolders under `guides/` each correspond to a guide topic. The `getting-started/` guide covers initial installation and setup for new consumers of the library.

---

### `/blog`
Release notes, updates, and development notes for the library.

**Module:** `BlogModule` (`app/blog/`)

---

### `/playground`
An interactive component playground. Uses a dedicated layout (`PlaygroundLayoutComponent`) with a side navigation (`PlaygroundSideNavComponent`) to allow switching between components and experimenting with them live.

**Module:** `PlaygroundModule` (`app/playground/`)

The playground host components are provided by `PlaygroundModule` from the library itself (`src/lib/playground/`) — the showcase playground route renders these directly, keeping example code co-located with the library components.

---

## Module Structure

Each feature section follows the same Angular lazy-loading module pattern:

```
feature/
├── feature.module.ts         ← NgModule with RouterModule.forChild([...]) 
├── feature.component.ts      ← Top-level route component for this section
├── feature.component.html
├── feature.component.css
└── sub-page/                 ← Child components for specific pages/topics
    ├── sub-page.component.ts
    ├── sub-page.component.html
    └── sub-page.component.css
```

The feature module is declared with `RouterModule.forChild()` (not `forRoot()`) because lazy-loaded modules must only add child routes to the existing router configuration — they should never re-initialise the router.

---

## App Module

`AppModule` bootstraps the application. It imports:
- `BrowserModule` — required once at the app root for DOM rendering
- `AppRoutingModule` — top-level router config
- `UserInterfaceLibraryModule` — imports all uilibrary components for use in showcase pages
- `ToastrModule.forRoot()` — initialises toast notifications at the app root (must be `forRoot()` so the service is a singleton)
- Feature modules for eagerly-loaded sections (`LayoutModule`, `HomeModule`, `DocumentationModule`, `GuidesModule`, `BlogModule`)

> **Note:** Eagerly importing feature modules in `AppModule` in addition to lazy loading them in the router is not ideal — ideally only `AppRoutingModule` and layout-level modules should be in `AppModule`. Lazy-loaded modules should be loaded exclusively via `loadChildren`.
