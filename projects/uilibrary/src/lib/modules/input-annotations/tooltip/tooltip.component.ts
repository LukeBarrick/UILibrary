import { Component, Input } from '@angular/core';

@Component({
  selector: 'uilibrary-tooltip',
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent{
  @Input() margin: string = 'none';
  @Input() placement: string = '';
  constructor() { }
}
