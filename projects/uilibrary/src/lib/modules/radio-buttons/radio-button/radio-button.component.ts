import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UUIDService } from '../../../core/services/UUID.service';

@Component({
  selector: 'uilibrary-radio-button',
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {
  public id = this.UUID.generate();

  constructor(private UUID: UUIDService) {}

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