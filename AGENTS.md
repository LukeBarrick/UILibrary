# AGENTS.md

> Agent operating rules for this workspace.
> Auto-maintained by `/update-docs` — non-MANUAL sections regenerated on each run.

---

## Permitted Patterns

- **NgModule declarations** — all components, directives, and pipes must be declared in a module; use `declarations` and `exports` arrays appropriately.
- **One feature module per component family** — isolates concerns; consumers cherry-pick what they need (e.g. `import { ButtonModule } from 'uilibrary'`).
- **`public-api.ts` as the sole export boundary** — re-export through this file; never have consumers import from deep internal paths.
- **SCSS design tokens via CSS custom properties / SCSS variables** — define in `styles/variable.scss`; allow overrides via `styles/variable-override.scss`.
- **Constructor injection or Angular's `inject()` function** — for Angular services and tokens.
- **Lazy-loaded routes in the showcase** — use `loadChildren` for all showcase feature routes to keep the initial bundle small.
- **`date-fns`** for all date manipulation — the dependency is already bundled.
- **Angular CDK** for accessibility primitives (overlay, focus management, etc.) where applicable.
- **`ng-mocks`** for mocking Angular dependencies in unit tests.

---

## Prohibited Patterns

- **Standalone components** — this codebase uses NgModule-based architecture; do not convert existing or add new standalone components.
- **Importing from internal library paths in the showcase** — always import from `'uilibrary'` (the dist alias in `tsconfig.json`), never from `projects/uilibrary/src/...`.
- **Symbols not exported via `public-api.ts`** — all intended-public API must be re-exported there; consumers cannot access unexported internals.
- **Modifying `dist/uilibrary/` directly** — this is build output only; run `npm run build-lib` or `npm run build-lib:dev` to regenerate.
- **Routing the library SCSS through the Angular build** — SCSS is compiled separately via the sass CLI; do not add it to `angular.json` styles for the library.
- **Third-party date libraries other than `date-fns`** — do not add `moment.js`, `luxon`, or similar.
- **Deeply nested inheritance hierarchies** — prefer composition and Angular's DI over deep class inheritance.
- **Event bus / messaging patterns** — component communication is handled via `@Input`/`@Output` and Angular services injected through DI.

---

## Adding a New Feature Module

Follow this checklist when adding a new UI component family to the library:

```
1. Create module folder:    projects/uilibrary/src/lib/modules/<name>/
2. Create NgModule:         <Name>Module  (with declarations + exports for all public components)
3. Create component(s):     <name>.component.ts / .html / .css
4. Export via public-api:   add `export * from './lib/modules/<name>/...'` entries to public-api.ts
5. Add SCSS (if needed):    projects/uilibrary/styles/components/<name>/ and import in _index.scss
6. Add showcase page:       projects/showcase/src/app/docs/<name>-showcase/
7. Register route:          add lazy-loaded route in showcase docs routing
8. Run /update-docs
```

---

## SCSS Changes

Changes to `styles/` require a separate build step — the Angular compiler does not process the library SCSS:

```bash
npm run build-sass:dev   # watch mode during development
npm run build-sass       # one-shot for CI / release
```

Output: `projects/uilibrary/assets/styles.css` — commit this compiled file alongside any SCSS source changes.

---

## Test Gate

All PRs must pass:

```bash
npm test   # Karma/Jasmine unit tests for the uilibrary project
```

---

## Files Agents Must NOT Modify Directly

| Path | Reason |
|---|---|
| `dist/uilibrary/` | Build output — run `npm run build-lib` or `npm run build-lib:dev` |
| `projects/uilibrary/assets/styles.css` | SCSS build output — run `npm run build-sass` |
| `.github/copilot-instructions.md` | Human-maintained workspace override — edit directly |
| `CLAUDE.md`, `AGENTS.md` | Use `/update-docs` to regenerate |

---

## Branch / PR Conventions

<!-- MANUAL -->
_Add your branch/PR rules here — or infer them from `.github/workflows/` if present._
