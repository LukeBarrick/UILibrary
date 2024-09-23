# SelectWcagHelperDirective

This directive attempts to force the Ng-Select component to be more WCAG compliant.

The latest v13 of `Ng-Select` has the marjority of these issues resolved. However it is depenant on Angular v18 which we cannot upgrade to yet.

Due to the very hackiness nature of this and the slightly complex changes this document has been written to give a little more context around this.

## Things done

* Add `role=button` attributes to the Clear selected button and dropdown toggle
* Add `Aria-Label` attributes to the Clear selected button and dropdown toggle
* Remove `autocomplete` attribute from elements that also have `aria-autocomplete` as they compete with each other.
* Add `Aria-label` to component with `aria-autocomplete` attribute applied
* Add `Aria-label` to component with `role=combobox` attribute.
* Add `aria-expanded` to component with `role=combobox` attribute as it is not initially set, only when the dropdown is first opened. After which NgSelect correctly sets it.

## Dynamic changes

The use of a mutation observer is used to monitors the bits of the component which change and to reapply changes.

* Re-add `aria-label` and `role=button` attributes to the Clear selected button when an option is selected.


# Aria labels

The select component had an unused `ariaLabel` input. This is first used, if not set the `placeholder` text is used.

This is applied as a data attribute against the `ng-select` component so the directive can access it.

# Known issues

* Dropdown options not tab-able. Arrow keys can be used to select the dropdown items but not the tab key. This behaviour is beyond the scope of a directive to change as its part of the NGSelect component internals and not simply missing DOM attributes.
