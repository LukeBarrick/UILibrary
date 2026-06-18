<!--
============================================================================================
MODULE README AUTHORING CHECKLIST
Tick off each item as you complete it. This comment block is invisible in Markdown preview.

MANDATORY (every module README must include these):
[ ] Title (H1) + one-sentence tagline  — what it is / what it's built on / what it avoids
[ ] Clickable Table of Contents with anchor links to every H2 section
[ ] Setup section — module import + service/directive injection; note what's already free
[ ] At least one Basic Usage section (one H2 per distinct usage scenario)
[ ] Options reference table (Option | Type | Default | Description) if any @Input/options exist
[ ] API reference — one H3 per public exported symbol, member tables (Member | Sig | Description)
[ ] Technical Decisions section — "Why X?" H3 for every non-obvious architectural choice
[ ] --- separator between every H2

CONDITIONAL (include when applicable):
[ ] How it works — ASCII flow diagram before usage prose (for systems with non-obvious data flow)
[ ] Closing / teardown — if the feature has a lifecycle beyond a simple open
[ ] SCSS utility classes table (Class | Element | Purpose)
[ ] Interaction / behaviour table (Scenario | Input/Guard result | Outcome)
[ ] Troubleshooting section (Symptom → Root cause → Fix)
============================================================================================
-->

# FeatureName

<!-- One sentence. Pattern: "A <what it is> for the UI Library. <Built on X / mirrors Y API>. <What it avoids or guarantees>." -->
A … for the UI Library. Built on … — no … required.

---

## Contents

- [Setup](#setup)
- [Basic usage — scenario one](#basic-usage--scenario-one)
- [Basic usage — scenario two](#basic-usage--scenario-two)
<!-- Add/remove scenario links to match your H2 sections -->
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)

<!-- CONDITIONAL — add if the flow is non-obvious:
- [How it works](#how-it-works)
-->

<!-- CONDITIONAL — add if applicable:
- [Closing / teardown](#closing--teardown)
- [SCSS utility classes](#scss-utility-classes)
- [Troubleshooting](#troubleshooting)
-->

---

<!-- CONDITIONAL SECTION — delete if the feature is simple enough that prose is sufficient
## How it works

Describe the high-level event/data flow with an ASCII diagram.
Use a fenced code block so it renders in a fixed-width font.

```
User action
  │
  ▼
Service method called
  │
  ▼
Result emitted / DOM updated
```

Briefly narrate the reverse path (teardown / close).

---
-->

## Setup

<!-- State which NgModule to import and note anything that's already provided for free. -->
`FeatureNameModule` is already imported by `UserInterfaceLibraryModule`, so no additional module import is needed if you are using the full library.

<!-- If direct module import IS needed, show it: -->
```typescript
import { FeatureNameModule } from 'uilibrary';

@NgModule({
  imports: [FeatureNameModule],
})
export class MyModule {}
```

<!-- Show how to inject the service or use the directive/pipe: -->
```typescript
import { FeatureNameService } from 'uilibrary';

@Component({ ... })
export class MyComponent {
  constructor(private featureService: FeatureNameService) {}
}
```

---

## Basic usage — scenario one

<!-- Replace the heading with a specific description, e.g. "Basic usage — component content" or "Basic usage — simple input". -->
<!-- Describe what the scenario is in one sentence, then show a minimal realistic example. -->

```typescript
import { FeatureNameService } from 'uilibrary';

@Component({ ... })
export class MyComponent {
  constructor(private featureService: FeatureNameService) {}

  doSomething(): void {
    const result = this.featureService.open(MyContentComponent);
    result.closed.subscribe(value => {
      console.log('Done:', value);
    });
  }
}
```

<!-- Use a blockquote callout for any gotcha or clarifying detail that would break prose flow: -->
> **Note:** Explain any non-obvious requirement or constraint here.

---

## Basic usage — scenario two

<!-- One H2 per distinct usage pattern. Duplicate this section as needed. -->

```typescript
// Example for the second scenario
```

```html
<!-- Corresponding template markup if relevant -->
```

> **Note:** Explain any gotcha specific to this scenario.

---

<!-- CONDITIONAL SECTION — include if the feature has a teardown / close lifecycle
## Closing / teardown

Explain how to close, destroy, or clean up. Show both:
  - Closing from *inside* the content (inject the service / token)
  - Closing from *outside* (hold a reference from the open/init call)

```typescript
// From inside
```

```typescript
// From outside
```

---
-->

## Options reference

All options are optional. <!-- Describe where defaults come from, e.g. global config or @Input default values. -->

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `optionA` | `boolean` | `true` | <!-- What it controls --> |
| `optionB` | `'sm' \| 'lg' \| string` | — | <!-- What it controls --> |
<!-- Add a row for every @Input, config property, or options-object key -->

---

## API reference

### `FeatureNameService`

<!-- One H3 per public exported symbol. -->

| Member | Signature | Description |
|--------|-----------|-------------|
| `open()` | `(content: ..., options?: ...) => FeatureRef` | <!-- What it does, what it returns --> |
| `close()` | `() => void` | <!-- What it does --> |

---

### `FeatureRef`

<!-- If the feature returns a ref object, document its members here. -->

| Member | Type | Description |
|--------|------|-------------|
| `closed` | `Observable<any>` | Emits the result when the feature completes. |
| `close(result?)` | `void` | <!-- --> |

---

### `FeatureNameModule`

| Declares | `FeatureNameComponent` |
|----------|------------------------|
| Provides | `FeatureNameService` |
| Exports  | `FeatureNameComponent` |
| Imports  | `CommonModule` |

---

<!-- CONDITIONAL SECTION — include if the feature defines CSS utility classes consumers apply in templates
## SCSS utility classes

Apply these classes to your template for consistent layout:

| Class | Element | Purpose |
|-------|---------|---------|
| `.feature-header` | `div` | Top bar — flex row, bottom border |
| `.feature-body` | `div` | Main content area with padding |
| `.feature-footer` | `div` | Bottom bar — flex row, right-aligned, top border |

---
-->

<!-- CONDITIONAL SECTION — include for stateful/guarded flows with multiple outcome paths
## Interaction / behaviour table

| Scenario | Input / guard result | What happens |
|----------|----------------------|--------------|
| Normal path | `true` | <!-- Describe outcome --> |
| Blocked path | `false` / `UrlTree` | <!-- Describe outcome --> |

---
-->

## Technical decisions

<!-- One H3 per non-obvious architectural choice. Use "Why X?" as the heading pattern.
     Answer the question a reviewer or future maintainer would naturally ask. -->

### Why X instead of Y?

<!-- Explain the trade-off. What would Y have required? What does X give you?
     Example structure:
     - Problem X solves
     - Why the obvious alternative (Y) was rejected
     - The trade-off / limitation accepted as a result -->

### Why does Z work this way?

<!-- Explain non-obvious implementation details. -->

---

<!-- CONDITIONAL SECTION — include when there are known failure modes with specific error messages
## Troubleshooting

### Error: `NG04002 — Cannot match any routes`

**Root cause:** …  
**Fix:** …

### Symptom: the feature opens but immediately closes

**Root cause:** …  
**Fix:** …

---
-->
