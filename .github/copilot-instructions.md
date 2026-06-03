# Copilot Workspace Instructions

## Solution
uilibrary

## Stack
angular

## Project type
library

---

## Workspace Overrides

_Edit this file to add project-specific rules that override or extend the global Copilot instructions._

### Angular version
This workspace uses **Angular 21** with **NgModule-based architecture** (not standalone components).

### Library boundary
All public API must flow through `projects/uilibrary/src/public-api.ts`. Do not suggest imports from internal paths.

### SCSS
Library styles live in `projects/uilibrary/styles/` and are compiled separately via the sass CLI — not through the Angular build. Always remind to run `npm run build-sass` after SCSS changes.

### Testing
Use **Jasmine + Karma** with **ng-mocks** for Angular-specific mocking. Test target is `ng test uilibrary`.
