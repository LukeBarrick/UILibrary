import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'uilibrary2-radio-button',
  templateUrl: './button.component.html',
})
export class RadioButton2Component {
  public id = crypto.randomUUID();

  @Input() value: any;
  @Input() checked: boolean | undefined;
  @Output() checkedChange = new EventEmitter<boolean>();

  @Input() disabled = false;
  @Input() labelPosition: string = 'left';
  @Output() select = new EventEmitter<void>();

  check() {
    if (!this.disabled) {
      this.checked = true;
      this.checkedChange.emit(this.checked);
    }
  }

  checkChanged() {
    if (!this.disabled) {
      this.checkedChange.emit();
    }
  }
}
