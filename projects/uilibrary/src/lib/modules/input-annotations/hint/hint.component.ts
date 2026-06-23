import { Component, Input } from '@angular/core';

@Component({
    selector: 'uilibrary-hint',
    templateUrl: './hint.component.html',
    standalone: false
})
export class HintComponent {
  @Input() variant = 'normal';
  constructor() {}
}
