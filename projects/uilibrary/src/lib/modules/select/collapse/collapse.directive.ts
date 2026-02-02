// collapse.directive.ts
import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
    selector: '[libCollapse]',
    standalone: false
})
/* 
  Going to keep this around although unused in select component as it will be useful in the future for CDK. 
*/
export class CollapseDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  toggle() {
    const element = this.el.nativeElement.querySelector('.ng-dropdown-panel') as HTMLElement;
    const fullHeight = element.scrollHeight;

    requestAnimationFrame(() => {
      // Then transition to full height
      this.renderer.setStyle(element, 'height', `${fullHeight}px`);

      const transitionEnd = () => {
        element.removeEventListener('transitionend', transitionEnd);
        // After transition, remove inline height (make it flexible)
        this.renderer.removeStyle(element, 'height');
      };
      element.addEventListener('transitionend', transitionEnd);
    });
  }
}
