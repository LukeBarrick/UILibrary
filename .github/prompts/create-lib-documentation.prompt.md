---
name: create-lib-documentation
description: "Create a README.md for one or more Angular UI library feature modules. Use when: documenting a new module, bootstrapping library component docs, writing technical documentation, creating module READMEs. Reads module source code, interviews the developer with targeted design-decision questions one at a time, then writes a README following the library template. Supports component:[name], component:[x],[y] and component:ALL."
argument-hint: "component:[module-name] or component:[x],[y] or component:ALL"
agent: "agent"
---

# Create Library Documentation

You are creating a `README.md` for one or more Angular UI library feature modules in this repository. Follow this procedure exactly, one module at a time.

---

## Step 1 — Parse the component argument

The user's message contains a `component:` argument. Extract the value(s) after `component:` and build an ordered list of module names to process.

| Argument format | Meaning |
|---|---|
| `component:button` | Process `button` only |
| `component:button,datepicker` | Process `button` then `datepicker` |
| `component:ALL` | Process all 18 known modules in this order: `button`, `checkboxes`, `context-menu`, `datepicker`, `form-field`, `icon`, `input`, `input-annotations`, `keyboard-navigation`, `modal`, `navigation`, `radio`, `rtl-layout`, `select`, `side-navigation`, `status-tags`, `table`, `toggle` |

Trim whitespace around module names. Module names are lowercase and hyphenated.

Complete the **full workflow (Steps 2–6)** for one module before starting the next.

---

## Step 2 — Pre-flight checks

For the current module `<name>`:

1. Verify `projects/uilibrary/src/lib/modules/<name>/` exists. If it does not, tell the user the module was not found and skip to the next module.
2. Check whether `projects/uilibrary/src/lib/modules/<name>/README.md` already exists. If it does, ask the user whether to overwrite it before continuing. Stop processing this module if they decline.

---

## Step 3 — Read the module source

Read all files inside `projects/uilibrary/src/lib/modules/<name>/`. Focus on:

- **NgModule** (`*.module.ts`) — `declarations`, `imports`, `exports`, `providers`
- **Components** (`*.component.ts`) — all `@Input()`, `@Output()`, public methods, injected services, `selector`, `changeDetection`
- **Templates** (`*.component.html`) — CSS classes applied in templates, structural patterns
- **Services** (`*.service.ts`) — public methods, injection scope (`providedIn`, or provided in module)
- **Models / interfaces / enums** (`*.model.ts`, `*.interface.ts`, `*.enum.ts`)

Also read:
- `projects/uilibrary/src/public-api.ts` — which symbols from this module are exported as part of the public API
- `projects/uilibrary/styles/components/<name>/` — any SCSS utility classes defined for this module (this directory may not exist for all modules; skip gracefully if absent)

---

## Step 4 — Interview the developer

Load [lib-doc-design-questions.md](./references/lib-doc-design-questions.md).

Based on the module's architecture and what you found in Step 3, select the **4–6 most relevant questions** from the question bank. Prioritise questions whose answers are not obvious from reading the source code. Skip questions about patterns that are self-evident.

Ask questions **one at a time** using the `vscode_askQuestions` tool. Structure each question clearly: provide a short header, a concise question, and where helpful, brief context explaining why you are asking. Wait for the developer's answer before asking the next question.

After each answer, decide:
- If the answer raises a follow-up that materially affects the documentation, ask it.
- Otherwise, move to the next selected question.
- Stop when you have enough information to write all mandatory README sections — especially the **Technical Decisions** section.

---

## Step 5 — Draft the README

Draft the `README.md` following the structure defined in [README-TEMPLATE.md](../../projects/uilibrary/src/lib/modules/README-TEMPLATE.md).

### Mandatory sections (always include)

- **Title (H1) + one-sentence tagline** — what it is / what it is built on / what it avoids
- **Table of Contents** — anchor links to every H2 section
- **Setup** — which NgModule to import; what is already provided by `UserInterfaceLibraryModule`; how to inject the service or use the directive
- **Basic usage** — one H2 per distinct usage scenario; minimal but realistic code examples using actual class names, selectors, and import paths from the source
- **Options reference table** — columns: Option | Type | Default | Description; one row per `@Input`, config property, or options-object key
- **API reference** — one H3 per public exported class/service/component/enum; member tables (Member | Signature/Type | Description)
- **Technical decisions** — at minimum one "Why X?" H3 subsection per non-obvious architectural choice, informed by the developer's interview answers
- `---` separator between every H2

### Conditional sections (include only when applicable)

- **How it works** — include for modules with non-trivial data/event flow; use an ASCII code-block diagram
- **Closing / teardown** — include if the module has a lifecycle beyond a simple method call
- **SCSS utility classes** — include only if SCSS utilities exist for this module; table columns: Class | Element | Purpose
- **Interaction / behaviour table** — include for stateful or guarded flows; columns: Scenario | Input / result | What happens
- **Troubleshooting** — include if there are known failure modes with specific error messages or symptoms

### Code examples — rules

- All import paths must use `'uilibrary'` (the public package alias), never internal paths like `projects/uilibrary/src/...`
- All class and selector names must match the actual source code exactly
- Show both TypeScript and HTML when both are needed to illustrate a concept
- Use `> **Note:**` blockquote callouts immediately after code blocks for gotchas or non-obvious requirements
- For multi-step setup, use numbered H3 sub-headings: "1. Import the module", "2. Declare routes", etc.

---

## Step 6 — Write the file

Write the completed README to `projects/uilibrary/src/lib/modules/<name>/README.md`.

Confirm to the user that the file has been written and state the full relative path.

If there are more modules in the list, begin Step 2 immediately for the next module.
