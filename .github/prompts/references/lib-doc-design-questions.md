# Library Documentation — Design Question Bank

Reference for the `/create-lib-documentation` and `/update-lib-documentation` prompts.

Select the **4–6 most relevant questions** for the module being documented, based on what you found in the source code. Do not ask questions whose answers are already self-evident from the code. Ask one question at a time and wait for the developer's answer before proceeding to the next.

---

## Dependencies

_Use when the module imports a third-party library, uses Angular CDK, or is notably self-contained._

- "Why did you choose [library / CDK primitive] over building this yourself? What would a custom implementation have required that made you reach for the dependency?"
- "Does this module introduce any new peer dependencies that consumers need to install? Are there version constraints?"
- "Why was [obvious alternative library] ruled out?"

---

## Dependency Injection Pattern

_Use when the module provides a service, or when `inject()` is used instead of constructor injection (or vice versa)._

- "Why does [service / component] use `inject()` rather than constructor injection here? Was this forced by Angular's partial compilation mode for library builds?"
- "Why is [service] provided at [module / component / root] level rather than a different scope? What would change if it were provided globally via `providedIn: 'root'`?"
- "Why is a class used as the injection token rather than an `InjectionToken<T>`? What does that affect for consumers?"

---

## API Design

_Use when the module exposes a service with multiple methods, or when `@Input` / `@Output` naming or semantics may not be obvious._

- "Does this feature distinguish between a 'successful completion' close and a 'cancel / dismiss' close? If so, why are those two separate events rather than one?"
- "Why is [option / input] named [name] rather than [alternative name]? Is it intentional alignment with an existing API convention (e.g. Bootstrap, ng-bootstrap, CDK)?"
- "What is the difference between [optionA] and [optionB]? When would a consumer choose one over the other?"
- "Why is configuration passed as a single options object rather than individual `@Input` properties, or vice versa?"
- "Why does `open()` return [ref / void / observable]? What does the return value allow a consumer to do?"

---

## Configuration Scope

_Use when the module has configurable behaviour with global defaults or per-instance overrides._

- "Why is [config option] configurable at global level? What real-world scenario drove that requirement?"
- "If a consumer wants to override [option] for a single instance only, what is the correct approach?"
- "Is the global config a singleton? What happens if a consumer provides it in both a root module and a lazy-loaded feature module?"
- "Which options can be changed after the component / overlay is already open? Why are the others immutable?"

---

## Accessibility

_Use for any interactive component: modal, overlay, dropdown, navigation, tooltip, datepicker, input, etc._

- "Which specific WCAG criteria does this component address? For example: focus trapping, ARIA roles, keyboard navigation, colour contrast."
- "What accessibility requirement did you explicitly decide NOT to implement, and why? Is that a known gap?"
- "Why does [element] use [ARIA role / attribute]? What would break for screen-reader users if it were omitted?"
- "Is there a known WCAG limitation or browser-specific accessibility issue that consumers should be aware of?"
- "How does the component handle focus on open and on close? Is focus returned to the trigger element?"

---

## Browser / Platform Edge Cases

_Use when the module deals with positioning, scroll, animation, overlay z-index, or platform-specific APIs._

- "Are there known browser-specific issues (e.g. iOS Safari momentum scrolling, Edge, Firefox) that consumers should be aware of?"
- "Was there a specific edge case — for example, scroll-lock causing layout shift, scrollbar reflow, or z-index stacking — that you deliberately chose not to handle? Why?"
- "Does this work in an SSR / Angular Universal context? If not, what specifically breaks and is there a workaround?"
- "Does this work inside a shadow DOM or inside an `overflow: hidden` container? If not, why not?"

---

## CSS and Styling

_Use when the module defines CSS utility classes consumers apply in templates, or when SCSS is non-trivial._

- "Why are the layout classes (e.g. `.ui-modal-header`) applied by the consumer in their own template rather than encapsulated inside the component? What flexibility does that provide?"
- "How does a consumer customise the appearance beyond the defaults — are CSS custom properties supported, or do they need to write global selector overrides?"
- "Why were utility CSS classes chosen over scoped component styles or CSS custom properties? What was the trade-off?"
- "Is there a recommended pattern for theming this component across an entire application?"

---

## Architectural Alternatives Rejected

_Use for any module where the implementation approach is non-obvious (CDK overlay, router outlet, custom directive, dynamic component creation, etc.)._

- "What was the main architectural alternative you seriously considered before landing on the current design? Why did you reject it?"
- "Why does this use [Angular CDK / named router outlet / ViewContainerRef / directive] rather than the simpler / more obvious approach?"
- "Was there a third-party component or library you evaluated? What made you build this instead of adopting it?"

---

## Known Limitations

_Use for all modules, especially those with complex interactions or option combinations._

- "What does this component NOT support that a consumer might reasonably expect it to?"
- "Are there combinations of options or features that don't work well together? Should any be documented as unsupported?"
- "Is there a use case you deliberately excluded from scope? What would a consumer need to do to handle it themselves?"

---

## Angular-Specific Decisions

_Use when the module uses non-default Angular patterns: `OnPush`, `forwardRef`, `ViewContainerRef`, dynamic component creation, `HostListener`, etc._

- "Why does this component use `ChangeDetectionStrategy.OnPush`? What would break if it used the default strategy?"
- "Why is [component / directive] created dynamically via `ViewContainerRef` rather than declared statically in a template?"
- "Is there a `forwardRef` anywhere? What circular dependency makes it necessary?"
- "Does this rely on any Angular lifecycle hook in a non-standard way — for example, reading a child's `ViewContainerRef` in `ngAfterViewInit`?"
- "Does anything here depend on decorator metadata emitted by TypeScript (`emitDecoratorMetadata`)? Why does that matter for library consumers?"
