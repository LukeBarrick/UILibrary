# uilibrary

> Angular 21 monorepo — reusable UI component library (`uilibrary`) and companion developer showcase app.

<!-- badges: add CI badge once workflows exist -->
<!-- ![Build](https://github.com/<org>/uilibrary/actions/workflows/build.yml/badge.svg) -->

---

## Overview

`uilibrary` is an Angular 21 component library providing 17 feature modules of reusable, consistently-styled UI components — from buttons and inputs to a datepicker, context menus, and keyboard-navigation helpers. It is built with [ng-packagr](https://github.com/ng-packagr/ng-packagr) and consumed via `UserInterfaceLibraryModule`. The companion `showcase` app serves as live documentation and an interactive playground for contributors.

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| Angular CLI | ^21.1.0 (`npm install -g @angular/cli`) |

---

## Getting Started

```bash
# Clone
git clone https://github.com/<org>/uilibrary.git
cd uilibrary

# Install dependencies
npm install

# Dev workflow — run all three concurrently (or use the "Start All" VS Code task)
npm run build-sass:dev    # Watches SCSS → assets/styles.css
npm run build-lib:dev     # Watches library → dist/uilibrary
npm start                 # Serves showcase at http://localhost:4200
```

---

## Project Structure

```
uilibrary/
├── angular.json                  ← CLI config for both projects
├── tsconfig.json                 ← Base TS config; extended by both projects
├── package.json                  ← Root deps and scripts
│
├── projects/
│   ├── uilibrary/                ← Library (ng-packagr)
│   │   ├── src/
│   │   │   ├── public-api.ts     ← Single public entry point
│   │   │   └── lib/
│   │   │       ├── core/         ← Services, models, enums, tokens
│   │   │       ├── modules/      ← 17 feature modules
│   │   │       ├── shared/       ← Shared declarations
│   │   │       └── playground/   ← Visual test components
│   │   ├── styles/               ← SCSS design system
│   │   └── assets/               ← Fonts, images, compiled styles.css
│   │
│   └── showcase/                 ← Developer reference app (not published)
│       └── src/app/
│           ├── docs/             ← One showcase page per module
│           ├── guides/           ← Usage guides
│           ├── playground/       ← Interactive playground
│           └── layout/           ← App shell
│
└── dist/uilibrary/               ← Build output (published to npm)
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Serve showcase at `http://localhost:4200` |
| `npm run build-lib:dev` | Watch-build library → `dist/uilibrary` |
| `npm run build-lib` | Production library build |
| `npm run build-sass:dev` | Watch-compile SCSS → `assets/styles.css` |
| `npm run build-sass` | One-shot SCSS compile |
| `npm test` | Unit tests (Karma/Jasmine) |
| `npm run build` | Production build of showcase |

---

## Running Tests

```bash
npm test   # Karma/Jasmine unit tests for the uilibrary project
```

---

## Contributing

1. Follow the conventions in [AGENTS.md](AGENTS.md)
2. Run the test gate before opening a PR: `npm test`
3. Add new component families by creating a feature module under `projects/uilibrary/src/lib/modules/` and a corresponding showcase page

---

## Licence

<!-- MANUAL -->
_Add licence information here._
