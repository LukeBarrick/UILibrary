import { Component, Input } from '@angular/core';

@Component({
    selector: 'uilibrary-tooltip',
    templateUrl: './tooltip.component.html',
    standalone: false
})
export class TooltipComponent{
  @Input() margin: string = 'left';
  @Input() placement: string = 'right';
  constructor() { }
}
