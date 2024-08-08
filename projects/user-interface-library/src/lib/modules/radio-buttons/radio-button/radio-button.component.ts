import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'uilibrary-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent {
  @Input() labelPosition: string = 'left';

  @Input() value: any;
  @Input() selected = false;
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();

  selectButton() {
    if (!this.disabled) {
      this.select.emit();
    }
  }
}