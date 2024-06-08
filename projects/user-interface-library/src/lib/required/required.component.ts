import { Component, Input } from '@angular/core';

@Component({
  selector: 'uilibrary-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.css'],
})
export class RequiredComponent {
  @Input() margin: string = 'none';
  constructor() {}
}
