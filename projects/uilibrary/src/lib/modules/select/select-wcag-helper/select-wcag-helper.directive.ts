import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, inject } from '@angular/core';

@Directive({
  selector: '[libSelectWcagHelper]'
})
export class SelectWcagHelperDirective {

  private el: ElementRef<HTMLElement> = inject(ElementRef);
  private platformID = inject(PLATFORM_ID);
  private mutationObserver?: MutationObserver;

  ngAfterViewInit() {
    if (!this.el?.nativeElement)
      return;

    this.fixupRoles();
    this.fixupAutocomplete();
    this.fixupCombobox();

    // The showcase project has SSR enabled. This means we need is browser checks to access DOM things otherwise we get compilation errors
    // Even though the library itself does not use SSR
    if (isPlatformBrowser(this.platformID)) {
      const config = { attributes: false, childList: true, subtree: true };
      this.mutationObserver = new window.MutationObserver(this.mutationObserverHandler);
      this.mutationObserver.observe(this.el.nativeElement, config);
    }
  }

  ngOnDestroy() {
    this.mutationObserver?.disconnect();
  }
  
  private getAriaLabel() {
    return this.el.nativeElement?.dataset?.['arialabel'] || '';
  }

  private mutationObserverHandler(mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      if (mutation.type !== 'childList')
        continue;

      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const added = mutation.addedNodes[i];

        if (!(added instanceof HTMLElement))
          continue;

        if (added.matches('.ng-clear-wrapper')) {
          added.setAttribute('role', 'button');
          added.setAttribute('aria-label', 'Clear selected item');
        }
      }
    }
  }

  private fixupCombobox() {
    const elements = this.el.nativeElement.querySelectorAll('[role="combobox"]');

    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('aria-label', this.getAriaLabel());

      if (!elements[i].hasAttribute('aria-expanded'))
        elements[i].setAttribute('aria-expanded', 'false');
    }
  }

  private fixupAutocomplete() {
    const elements = this.el.nativeElement.querySelectorAll('[aria-autocomplete][autocomplete]');

    for (let i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('autocomplete');
      elements[i].setAttribute('aria-label', this.getAriaLabel());
    }
  }

  private fixupRoles() {
    const elements = this.el.nativeElement.querySelectorAll('.ng-clear-wrapper, .ng-arrow-wrapper');

    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('role', 'button');

      if (elements[i].classList.contains('ng-clear-wrapper')) {
        elements[i].setAttribute('aria-label', 'Clear selected item');
      } else {
        elements[i].setAttribute('aria-label', 'Toggle dropdown options');
      }
    }
  }
}
