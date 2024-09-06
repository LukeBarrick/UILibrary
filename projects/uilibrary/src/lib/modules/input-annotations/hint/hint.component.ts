import { Component, Input } from '@angular/core';

@Component({
  selector: 'uilibrary-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.css'],
})
export class HintComponent {
  @Input() variant = 'error';
  constructor() {}
}
