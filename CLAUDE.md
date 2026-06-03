# CLAUDE.md

> Auto-maintained by `/update-docs` — regenerates non-MANUAL sections on each run.
> Mark any section `<!-- MANUAL -->` to protect it from regeneration.

---

## Project

**Name:** uilibrary  
**Purpose:** Reusable Angular UI component library with 17 feature modules, distributed as an npm package and documented via a companion showcase app.  
**Stack:** angular  
**Project type:** library  

---

## Architecture

NgModule-based Angular library (traditional modules, not standalone components). The companion showcase app uses lazy-loaded routing and imports the library via a local `dist/` path alias.

**Dependency flow:**
```
styles/ (SCSS design tokens — compiled separately via sass CLI)
    ↓
projects/uilibrary/src/lib/
    core/        ← singleton services, models, enums, injection tokens
    shared/      ← shared declarations (pipes, directives) — no business logic
    modules/     ← 17 feature modules, one per component family
    playground/  ← visual test components (exported, not consumed by end users)
        ↓
public-api.ts    ← single public entry point; ng-packagr enforces this boundary
        ↓
dist/uilibrary/  ← published npm package (build output)
        ↓
projects/showcase/  ← developer reference app (not published)
```

---

## Stack

| Concern | Choice |
|---|---|
| Runtime | Angular 21.1.0 / Node ≥ 18 |
| Language | TypeScript ~5.9 |
| ORM / data | none |
| DB | none |
| Test | Jasmine 5.1 + Karma 6.4 + ng-mocks 14 |
| Presentation | ng-packagr (library) + showcase SPA |
| CSS | Bootstrap 5.3.3 · ng-bootstrap 20 · SCSS (compiled separately via sass CLI) |
| Key deps | date-fns 4 · ngx-toastr 19 · angular-svg-icon · ng-select 21 · Angular CDK 21 |

---

## Key Conventions

- **NgModule only** — no standalone components. Every component, directive, and pipe must be declared in a feature module.
- **`public-api.ts` is the only surface** — only symbols re-exported from `public-api.ts` are usable by consumers; nothing else should be imported directly by external apps.
- **SCSS compiled separately** — run `build-sass:dev` (or `build-sass`) independently of the Angular build. Output goes to `projects/uilibrary/assets/styles.css`; commit this file alongside SCSS changes.
- **One feature module per component family** — e.g., `ButtonModule`, `DatepickerModule`. Consumers import only what they need.
- **Core / Shared / Feature split** — `core/` for singleton services, models, enums, and tokens; `shared/` for reusable declarations; `modules/` for feature UI modules.
- **Showcase mirrors library modules** — each feature module has a corresponding `docs/<component>-showcase/` page in the showcase app.
- **Locale set to `en-GB`** — Angular i18n `sourceLocale` is `en-GB`.
- **Path alias for local dev** — root `tsconfig.json` maps `"uilibrary"` → `"./dist/uilibrary"` so the showcase imports the library as if it were an npm package.

---

## Running Locally

```bash
# Install dependencies
npm install

# Dev workflow — run all three concurrently (or use the "Start All" VS Code task)
npm run build-sass:dev       # Watches SCSS → assets/styles.css
npm run build-lib:dev        # Watches library → dist/uilibrary
npm start                    # Serves showcase at http://localhost:4200

# Production builds
npm run build-sass           # One-shot SCSS compile
npm run build-lib            # Production library build (ng-packagr)

# Tests
npm test                     # Karma/Jasmine unit tests for the uilibrary project
```

---

## Known Constraints / Tech Debt

<!-- MANUAL -->
_Populate manually, or run `/update-docs` after adding `// TODO:` comments to surface them here._
