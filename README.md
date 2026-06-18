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

## AI-Assisted Documentation

This repository ships two [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) slash commands for generating and maintaining module READMEs. You need VS Code with the GitHub Copilot extension to use them.

### `/create-lib-documentation`

Generates a `README.md` for one or more feature modules from scratch. It reads the module source code, asks you a series of design-decision questions one at a time (surfacing choices you may not have thought to document), then writes a README to `projects/uilibrary/src/lib/modules/<name>/README.md`.

```
# Document a single module
/create-lib-documentation component:button

# Document several modules in sequence
/create-lib-documentation component:button,datepicker,select

# Document every module (one at a time — you will be interviewed per module)
/create-lib-documentation component:ALL
```

When prompted, answer the questions in the chat panel. The more detail you provide, the richer the Technical Decisions section of the README will be. After all questions are answered, the file is written automatically — no copy-paste required.

### `/update-lib-documentation`

Updates an existing `README.md` after code changes. It inspects the git commit history since the README was last modified, identifies which source files changed, maps those changes to specific README sections (e.g. new `@Input` → Options table, new SCSS class → SCSS utilities), asks targeted questions about the changes, and rewrites only the affected sections.

```
# Sync docs for a single module after making changes
/update-lib-documentation component:button

# Sync docs for multiple modules
/update-lib-documentation component:button,datepicker
```

Run this command after any meaningful change to a module — new inputs, refactored services, added SCSS utilities — to keep the docs in step with the code.

### First time setup

No installation is needed beyond the Copilot extension. The prompt files live in `.github/prompts/` and are picked up automatically by VS Code Copilot. Type `/` in the Copilot Chat panel to see both commands in the list.

If a module does not yet have a README, `/update-lib-documentation` will tell you and redirect you to `/create-lib-documentation` instead.

---

## Contributing

1. Follow the conventions in [AGENTS.md](AGENTS.md)
2. Run the test gate before opening a PR: `npm test`
3. Add new component families by creating a feature module under `projects/uilibrary/src/lib/modules/` and a corresponding showcase page — then run `/create-lib-documentation component:<name>` to generate the README

---

## Licence
MIT License

Copyright (c) 2026 Luke Barrick, Stephen Cooper

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.