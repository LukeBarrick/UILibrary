import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  form2 = new FormGroup({
    selectControl: new FormControl(null),
    selectControl2: new FormControl(null)
  });

  items = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];

  debug() {
    console.log(this.form2)
  }

  customSearchFn(term: string, item: any) {
    item.name = item.name.replace(',','');
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1;
  }
}
