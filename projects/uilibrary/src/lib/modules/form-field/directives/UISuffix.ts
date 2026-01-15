import { Directive, Input, forwardRef } from '@angular/core';

export abstract class UISuffix {
  isText: boolean = false;
}

@Directive({
  selector: '[ui-suffix], [ui-text-suffix]',
  providers: [
    {
      provide: UISuffix,
      useExisting: forwardRef(() => SuffixDirective),
    },
  ],
})
export class SuffixDirective implements UISuffix {
  constructor() {
  }
  public isText: boolean = false;

  @Input('ui-text-suffix')
  set _isText(value: '') {
    this.isText = true;
  }
}
