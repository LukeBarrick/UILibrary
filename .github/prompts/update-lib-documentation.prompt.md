---
name: update-lib-documentation
description: "Update an existing module README.md based on recent code changes. Use when: a UI library module has been modified and its docs are out of date, syncing documentation after a feature addition or refactor, updating library docs after code changes. Reads git history since the README was last modified, identifies what changed, asks targeted questions, and rewrites only the affected README sections."
argument-hint: "component:[module-name] or component:[x],[y]"
agent: "agent"
---

# Update Library Documentation

You are updating an existing `README.md` for one or more Angular UI library feature modules. You will analyse what has changed in the code since the README was last written, ask the developer targeted questions about those changes, and update only the affected sections. Follow this procedure exactly.

---

## Step 1 — Parse the component argument

The user's message contains a `component:` argument. Extract the value(s) after `component:` and build an ordered list of module names to process.

| Argument format | Meaning |
|---|---|
| `component:button` | Process `button` only |
| `component:button,datepicker` | Process `button` then `datepicker` |

`component:ALL` is not supported for this command — run `/create-lib-documentation component:ALL` for bulk creation instead.

Trim whitespace around module names. Module names are lowercase and hyphenated.

Complete the **full workflow (Steps 2–7)** for one module before starting the next.

---

## Step 2 — Pre-flight checks

For the current module `<name>`:

1. Verify `projects/uilibrary/src/lib/modules/<name>/` exists. If it does not, tell the user and skip to the next module.
2. Check whether `projects/uilibrary/src/lib/modules/<name>/README.md` exists. If it does **not** exist, tell the user: *"No README found for `<name>`. Run `/create-lib-documentation component:<name>` to create one from scratch."* Then skip to the next module.

---

## Step 3 — Determine the commit range

Run the following git commands in the terminal to find what has changed since the README was last written.

**Find the last commit that touched the README:**

```
git log -1 --format="%H" -- projects/uilibrary/src/lib/modules/<name>/README.md
```

Store the result as `<readme-commit>`.

- If this returns empty (the README has never been committed), use the full history: treat `<readme-commit>` as the initial commit of the repository.

**List commits to the module since then:**

```
git log --oneline <readme-commit>..HEAD -- projects/uilibrary/src/lib/modules/<name>/
```

- If this returns no commits, tell the user: *"No code changes found since the README was last written. Documentation appears to be up to date."* Then skip to the next module.

---

## Step 4 — Analyse what changed

**Get the full diff for the module since `<readme-commit>`:**

```
git diff <readme-commit>..HEAD -- projects/uilibrary/src/lib/modules/<name>/
```

Also read the current content of `projects/uilibrary/src/lib/modules/<name>/README.md` in full.

Map each change to the README section(s) it affects using this table:

| Type of change | README section(s) to update |
|---|---|
| New or changed `@Input()` / `@Output()` | Options reference table, API reference |
| New or changed public method or service method | API reference |
| New symbol added to `public-api.ts` | API reference (add symbol); Setup (if import instructions change) |
| New SCSS utility class in `styles/components/<name>/` | SCSS utility classes |
| Changed NgModule `imports` / `providers` | Setup |
| New usage pattern or scenario (new component, new service method) | New Basic usage section |
| Bug fix for a documented edge case | Troubleshooting (update or remove entry) |
| Refactor that changes the architectural approach | Technical decisions |
| New constructor parameter or `inject()` call | Technical decisions (DI pattern) |
| New dependency added to `package.json` | Setup, Technical decisions |

Produce a short list of: (a) the changes found, and (b) which README sections need updating. Show this summary to the user before proceeding.

---

## Step 5 — Interview the developer

Load [lib-doc-design-questions.md](./references/lib-doc-design-questions.md).

Based on the changes identified in Step 4, select **targeted questions** from the question bank — focus on questions relevant to the specific types of changes found. Do not ask questions unrelated to what changed.

Also formulate change-specific questions such as:
- "The diff shows [new @Input `x`] was added. What does it control, and what is its default value?"
- "A new dependency on [library] was added. Why was it chosen, and is there anything consumers need to install?"
- "The [method name] method signature changed. What was the reason for the change, and is this a breaking change for existing consumers?"

Ask questions **one at a time** using the `vscode_askQuestions` tool. Wait for the developer's answer before asking the next question. Stop when you have enough information to update all affected sections accurately.

---

## Step 6 — Update the affected sections

Rewrite **only** the README sections identified in Step 4. Do not alter sections that are not affected by the changes.

Follow the structural rules from [README-TEMPLATE.md](../../projects/uilibrary/src/lib/modules/README-TEMPLATE.md):

- All import paths in code examples must use `'uilibrary'`, never internal paths
- Keep `---` separators between every H2
- If a new section is being added (e.g. SCSS utility classes did not previously exist), insert it in the canonical position from the template
- If an existing section no longer applies (e.g. a feature was removed), remove that section entirely
- Preserve the Table of Contents — add, update, or remove anchor links to reflect section changes

---

## Step 7 — Write the file

Write the updated README to `projects/uilibrary/src/lib/modules/<name>/README.md`.

Confirm to the user which sections were updated and state the full relative path.

If there are more modules in the list, begin Step 2 immediately for the next module.
