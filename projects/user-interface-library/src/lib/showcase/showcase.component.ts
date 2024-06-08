import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'uilibrary-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css'],
})
export class ShowcaseComponent {
  form: FormGroup = this.formBuilder.nonNullable.group({
    button: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder) {}
  public patchFormValue($event: string): void {
    this.form.patchValue({
      button: $event,
    });
  }
}
