import { Component, Input } from '@angular/core';

@Component({
  selector: 'uilibrary-required',
  templateUrl: './required.component.html',
})
export class RequiredComponent {
  @Input() margin: string = 'none';
  constructor() {}
}
