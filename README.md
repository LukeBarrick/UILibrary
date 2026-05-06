# UI Library — Angular Monorepo

An Angular 21 monorepo containing a reusable UI component library (`uilibrary`) and a companion developer showcase app (`showcase`). The library is built with [ng-packagr](https://github.com/ng-packagr/ng-packagr) and published as an npm package. The showcase app serves as live documentation, a component reference, and an interactive playground.

---

## Project Structure

```
uilibrary/                        ← Workspace root
├── angular.json                  ← Angular CLI config (build, serve, test targets for each project)
├── tsconfig.json                 ← Base TypeScript config; all projects extend this
├── package.json                  ← Root dependencies and npm scripts
│
├── projects/
│   ├── uilibrary/                ← UI component library (ng-packagr)
│   │   ├── src/
│   │   │   ├── public-api.ts     ← Library public entry point; only what is exported here is usable by consumers
│   │   │   └── lib/
│   │   │       ├── core/         ← Services, models, enums, tokens — shared library internals
│   │   │       ├── modules/      ← 16 feature modules, one per UI component family
│   │   │       ├── shared/       ← Shared utilities used across feature modules
│   │   │       └── playground/   ← In-library visual test components (not published to consumers)
│   │   ├── styles/               ← SCSS design system (variables, components, utilities)
│   │   ├── assets/               ← Fonts, images, compiled styles.css
│   │   └── ng-package.json       ← ng-packagr config; defines entry file and output destination
│   │
│   └── showcase/                 ← Developer reference app (not published)
│       └── src/app/
│           ├── docs/             ← One showcase component per uilibrary module
│           ├── guides/           ← Getting-started and usage guides
│           ├── playground/       ← Interactive component playground
│           ├── blog/             ← Updates and changelog
│           └── layout/           ← Shell layout component wrapping all routes
│
└── dist/
    └── uilibrary/                ← Build output; this is what gets published to npm
```

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | ^21.1.0 | Framework |
| TypeScript | ~5.9 | Language |
| ng-packagr | ^21.1.0 | Builds the library into a publishable package |
| Bootstrap | ^5.3.3 | Base CSS framework |
| ng-bootstrap | ^20.0.0 | Angular Bootstrap components |
| ng-select | ^21.5.2 | Select/dropdown component |
| ngx-toastr | ^19.0.0 | Toast notifications |
| date-fns | ^4.1.0 | Date utility functions |
| angular-svg-icon | ^17.0.0 | SVG icon rendering |
| SCSS / Sass | — | Styling; compiled separately from the Angular build |
| zone.js | ~0.15.1 | Change detection |
| Jasmine / Karma | ~5.1 / ~6.4 | Unit testing |
| ng-mocks | ^14.15.2 | Angular-specific test mocking utilities |

---

## Architecture Patterns

### NgModule-based Architecture
This project uses the traditional **NgModule** pattern throughout — not standalone components. Every component belongs to a feature module which controls its declarations and exports.

### Core / Shared / Feature Split
A common Angular pattern for scalable libraries:
- **`CoreModule`** — singleton services, models, enums, injection tokens. Imported once at the library root.
- **`SharedModule`** — reusable declarations (pipes, directives) with no business logic. Can be imported by any feature module.
- **Feature modules** — self-contained per UI component family (e.g. `ButtonModule`, `DatepickerModule`). Consumers import only what they need.

### Lazy-Loaded Routing (Showcase)
The showcase app uses Angular's `loadChildren` lazy loading for all main routes. Modules are only downloaded by the browser when that route is first navigated to, keeping initial bundle size small.

### Separate SCSS Compilation
The library's SCSS is compiled independently of the Angular build using the `sass` CLI. This produces `assets/styles.css`, which consumers import into their own project alongside the Angular modules.

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- Angular CLI: `npm install -g @angular/cli`

### Install dependencies
```bash
npm install
```

### Available Scripts

| Script | Command | Description |
|---|---|---|
| Start showcase | `npm start` | Serves the showcase app at `http://localhost:4200` |
| Build library (dev, watch) | `npm run build-lib:dev` | Builds uilibrary in watch mode to `dist/uilibrary` |
| Build library (production) | `npm run build-lib` | Production build of the library |
| Compile SCSS (dev, watch) | `npm run build-sass:dev` | Watches and compiles `styles/styles.scss` → `assets/styles.css` |
| Compile SCSS (production) | `npm run build-sass` | One-shot SCSS compilation |
| Run tests | `npm test` | Runs unit tests for the `uilibrary` project via Karma |
| Build showcase | `npm run build` | Production build of the showcase app |

> **Dev workflow:** Run `build-sass:dev`, `build-lib:dev`, and `start` concurrently. The `Start All` VS Code task handles this automatically.

---

## Projects

### uilibrary
The Angular UI component library. Built with ng-packagr and intended to be consumed by other Angular applications. Contains 16 feature modules, a design-token-driven SCSS system, and a playground module for visual development.

→ See [projects/uilibrary/README.md](projects/uilibrary/README.md) for full details.

### showcase
The developer reference Angular application. Not published — used locally to browse component documentation, run interactive examples, and verify library output.

→ See [projects/showcase/README.md](projects/showcase/README.md) for full details.
