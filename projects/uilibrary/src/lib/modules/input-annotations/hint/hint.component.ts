import { Component, Input } from '@angular/core';

@Component({
  selector: 'uilibrary-hint',
  templateUrl: './hint.component.html',
})
export class HintComponent {
  @Input() variant = 'error';
  constructor() {}
}
