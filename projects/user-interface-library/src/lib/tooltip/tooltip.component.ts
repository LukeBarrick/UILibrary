import { Component, Input } from '@angular/core';

@Component({
  selector: 'uilibrary-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent{
  @Input() margin: string = 'none';
  @Input() placement: string = '';
  constructor() { }
}
