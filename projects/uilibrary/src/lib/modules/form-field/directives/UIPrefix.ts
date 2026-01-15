import { Directive, Input, forwardRef } from '@angular/core';

export abstract class UIPrefix {
  isText: boolean = false;
}

@Directive({
  selector: '[ui-prefix], [ui-text-prefix]',
  providers: [
    {
      provide: UIPrefix,
      useExisting: forwardRef(() => PrefixDirective),
    },
  ],
})
export class PrefixDirective implements UIPrefix {
  constructor() {
  }
  public isText: boolean = false;

  @Input('ui-text-prefix')
  set _isText(value: '') {
    this.isText = true;
  }
}
